import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  registerSchema,
  options,
  loginSchema,
  generateToken,
} from "../utils/utils";
import { AuthorInstance } from "../model/user";
import bcrypt from "bcryptjs";
import { BookInstance } from "../model/book";

export async function RegisterUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const validationResult = registerSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const duplicatEmail = await AuthorInstance.findOne({
      where: { email: req.body.email },
    });
    if (duplicatEmail) {
      return res.status(409).json({
        msg: "Email is used, please change email",
      });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 8);
    const record = await AuthorInstance.create({
      id: id,
      author: req.body.author,
      age: req.body.age,
      email: req.body.email,
      password: passwordHash,
      address: req.body.address,
    });

    // res.redirect("/author/register");
    return res.redirect("/author/success");

    // return res.status(201).json({
    //   msg: "You have successfully created a user",
    //   record: record,
    // });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "failed to register",
      route: "/register",
    });
  }
}

export async function LoginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const validationResult = loginSchema.validate(req.body, options);

    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const User = (await AuthorInstance.findOne({
      where: { email: req.body.email },
    })) as unknown as { [key: string]: string };

    const { id } = User;
    const token = generateToken({ id });
    const validUser = await bcrypt.compare(req.body.password, User.password);

    if (!validUser) {
      res.status(401).json({
        message: "Password do not match",
      });
    }

    // if (validUser) {
    //   res.status(200).json({
    //     message: "Successfully logged in",
    //     token,
    //     User,
    //   });
    // }

    if (validUser) {
      res
        .cookie("token", token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
          sameSite: "strict",
          // secure: process.env.NODE_ENV === "production",
        })
        .cookie("id", id, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
          sameSite: "strict",
          // secure: process.env.NODE_ENV === "production",
        });
      return res.redirect("/author/dash");
      // res.status(200).json({ title: "registerd successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "failed to login",
      route: "/login",
    });
  }
}

export async function renderUserDashBoard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.cookies.id;
  try {
    const record = await AuthorInstance.findOne({
      where: { id },
      include: [
        {
          model: BookInstance,
          as: "Books",
        },
      ],
    });
    return res.render("dashBoard", { record });

    // return res.render("dashBoard");

    // res.status(200).json({
    //   msg: "You have successfully fetch authors book",
    //   record,
    // });
  } catch (error) {
    res.redirect("/author/login");
    // res.status(500).json({
    //   msg: "failed to get details",
    //   route: "/login",
    // });
  }
}

export async function LogOut(req: Request, res: Response, next: NextFunction) {
  res.cookie("token", "", {
    maxAge: 0,
    sameSite: "strict",
    httpOnly: true,
  });
  res.cookie("id", "", {
    maxAge: 0,
    sameSite: "strict",
    httpOnly: true,
  });
  if (req.headers["postman-token"]) {
    return res.status(200).json({ msg: "You have successfully logout" });
  } else {
    return res.redirect("/author/refresh");
  }
}

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;
    //  const record = await BookInstance.findAll({where: {},limit, offset})
    const record = await AuthorInstance.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: BookInstance,
          as: "Books",
        },
      ],
    });
    // res.status(200).render("authors", { record });

    return res.status(200).json({
      msg: "You have successfully fetch all authors",
      count: record.count,
      record: record.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to read",
      route: "/read",
    });
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const record = await AuthorInstance.findOne({
      where: { id },
      // include: [
      //   {
      //     model: BookInstance,
      //     attributes: ["id", "name", "isPublished", "serialNumber"],
      //     as: "Books",
      //   },
      // ],
    });
    // res.status(200).render("author", { record });

    // res.status(200).json({
    //   msg: "You have successfully fetch author",
    //   record,
    // });

    return record;
  } catch (error) {
    res.status(500).json({
      msg: "failed to get user",
      route: "/read",
    });
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const { email, password } = req.body;

    const record = await AuthorInstance.findOne({
      where: {
        id,
      },
    });

    if (!record) {
      return res.status(404).json({ msg: "User not found" });
    }
    const updatedrecord = await record.update({ email, password });

    return res.status(200).json({
      msg: "You have successfully updated a book",
      record,
    });
  } catch (error) {}
  {
    res.status(500).json({
      msg: "failed to update",
      route: "/update/:id",
    });
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const record = await AuthorInstance.destroy({
      where: { id },
    });
    return res.status(200).json({
      msg: "You have successfully deleted a book",
      record,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to delete",
      route: "/delete",
    });
  }
}

/*
to get update a user:
- get the user id
- get the user details --> email and password
- check if the user exists --> if not return error from userinstance using findOne method
- declare a new object to store the updated user details


to delete a user:
- get the user id
-  await userinstance.destroy({where: {id}})
- return the deleted success message
- if error return error message

to get all users:
- await userinstance.findAndCountAll({include: [{model: bookinstance, as: 'Books'}]})
- return the users and count

to renderlogin page:
- get id = req.cookies.id
- try:
  + record = await userinstance.findOne({where: {id, include: [{model: bookinstance, as: 'Books'}]}})
  + res.render('dashboard', {record})
- catch:
  + if error return error message
*/
