"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getSingleBook = exports.getBooks = exports.createBooks = void 0;
const uuid_1 = require("uuid");
const book_1 = require("../model/book");
const user_1 = require("../model/user");
const utils_1 = require("../utils/utils");
async function createBooks(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const verified = req.user;
        const validationResult = utils_1.createBookSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const record = await book_1.BookInstance.create({
            id,
            ...req.body,
            authorsID: verified.id,
        });
        res.redirect("register");
        // res.status(201).json({
        //   msg: `You have successfully created a book`,
        //   record,
        // });
    }
    catch (err) {
        res.status(500).json({
            msg: "failed to create",
            route: "/create",
        });
    }
}
exports.createBooks = createBooks;
async function getBooks(req, res, next) {
    try {
        // const limit = req.query?.limit as number | undefined;
        // const offset = req.query?.offset as number | undefined;
        //  const record = await BookInstance.findAll({where: {},limit, offset})
        const record = await book_1.BookInstance.findAll({
            // limit,
            // offset,
            include: [
                {
                    model: user_1.AuthorInstance,
                    attributes: ["id", "author", "age", "email", "address"],
                    as: "Authors",
                },
            ],
        });
        res.render("index", { record: record });
        // res.status(200).json({
        //   msg: `You have successfully fetch all Book`,
        //   record: record,
        //   // count: record.count,
        //   // record: record.rows,
        // });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read",
            route: "/fetch all books",
        });
    }
}
exports.getBooks = getBooks;
async function getSingleBook(req, res, next) {
    try {
        const { id } = req.params;
        const record = await book_1.BookInstance.findOne({ where: { id } });
        res.render("singleBook", { record: record });
        // console.log(record);
        return res.status(200).json({
            msg: "Successfully gotten user information",
            record,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read single todo",
            route: "/read/:id",
        });
    }
}
exports.getSingleBook = getSingleBook;
async function updateBook(req, res, next) {
    try {
        const { id } = req.params;
        const { name, isPublished, serialNumber, authorsID } = req.body;
        const validationResult = utils_1.updateBookSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const record = await book_1.BookInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                Error: "Cannot find existing todo",
            });
        }
        const updatedrecord = await record.update({
            name: name,
            isPublished: isPublished,
            serialNumber: serialNumber,
            authorsID: authorsID,
        });
        res.status(200).json({
            msg: "You have successfully updated your todo",
            updatedrecord,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to update",
            route: "/update/:id",
        });
    }
}
exports.updateBook = updateBook;
async function deleteBook(req, res, next) {
    try {
        const { id } = req.params;
        const record = await book_1.BookInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                msg: "Cannot find todo",
            });
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            msg: "Todo deleted successfully",
            deletedRecord,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to delete",
            route: "/delete/:id",
        });
    }
}
exports.deleteBook = deleteBook;
