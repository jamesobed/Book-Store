import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { BookInstance } from "../model/book";
import { AuthorInstance } from "../model/user";
import { createBookSchema, options, updateBookSchema } from "../utils/utils";

export async function createBooks(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const verified = req.user;
    const validationResult = createBookSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const record = await BookInstance.create({
      id,
      ...req.body,
      authorsID: verified.id,
    });

    if (req.headers["postman-token"]) {
      return res.status(201).json({
        msg: `You have successfully created a book`,
        record,
      });
    } else {
      return res.redirect("/author/dash");
    }
  } catch (err) {
    return res.status(500).json({
      msg: "failed to create",
      route: "/create",
    });
  }
}

export async function getBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // const limit = req.query?.limit as number | undefined;
    // const offset = req.query?.offset as number | undefined;
    //  const record = await BookInstance.findAll({where: {},limit, offset})
    const record = await BookInstance.findAll({
      // limit,
      // offset,
      include: [
        {
          model: AuthorInstance,
          attributes: ["id", "author", "age", "email", "address"],
          as: "Authors",
        },
      ],
    });
    console.log(record);
    return record;
    // res.render("index", { record });

    // res.status(200).json({
    //   msg: `You have successfully fetch all Book`,
    //   record: record,
    // });
  } catch (error) {
    res.status(500).json({
      msg: "failed to read",
      route: "/fetch all books",
    });
  }
}

export async function getSingleBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await BookInstance.findOne({
      where: { id },
      include: [
        {
          model: AuthorInstance,
          attributes: ["id", "author", "age", "email", "address"],
          as: "Authors",
        },
      ],
    });

    // console.log(record);
    if (req.headers["postman-token"]) {
      return res.status(200).json({
        msg: "Successfully gotten book information",
        record,
      });
    }
    res.render("updateBook", { record: record });
  } catch (error) {
    res.status(500).json({
      msg: "failed to read single book",
      route: "/read/:id",
    });
  }
}

export async function updateBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("before");
  try {
    console.log("after");
    const { id } = req.params;
    console.log(req.body);

    const { name, isPublished, serialNumber, authorsID } = req.body;
    const validationResult = updateBookSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }

    const record = await BookInstance.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        Error: "Cannot find existing book",
      });
    }
    const updatedrecord = await record.update({
      name: name,
      isPublished: isPublished,
      serialNumber: serialNumber,
      authorsID: authorsID,
    });

    if (req.headers["postman-token"]) {
      return res.status(200).json({
        msg: "You have successfully updated your Book",
        updatedrecord,
      });
    } else {
      return res.redirect("/author/dash");
    }
  } catch (error) {
    res.status(500).json({
      msg: "failed to update",
      route: "/update/:id",
    });
  }
}

export async function deleteBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await BookInstance.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        msg: "Cannot find Book",
      });
    }
    const deletedRecord = await record.destroy();

    // return res.redirect("/book/delete");

    return res.redirect("/author/dash");

    // return res.status(200).json({
    //   msg: "Book deleted successfully",
    //   deletedRecord,
    // });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "failed to delete",
      route: "/delete/:id",
    });
  }
}
