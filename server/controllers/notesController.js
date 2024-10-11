const express = require("express");
require("dotenv").config();
const Notes = require("../Models/Notes");
const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();
var upload = multer({ storage: storage });

const uploadNote = async (req, res) => {
  try {
    const fileName = req.body.file;
    const fileDescription = req.body.description;
    const tags = req.file.tags;
    const file = req.file.filename;
    const uploadedBy = req.body.userId;
    console.log(uploadedBy);
    const newFile = new Notes({
      fileName: fileName,
      fileDescription: fileDescription,
      files: file,
      tags: tags,
      uploadedBy: uploadedBy,
    });
    await newFile.save();
    res.send({ status: "ok" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getNote = async (req, res) => {
  try {
    const { title, tag } = req.query;
    const query = {};
    if (title) {
      query.fileName = {
        $regex: title,
        $options: "i",
      };
    }
    if (tag) {
      query.tag = {
        $regex: tag,
        $options: "i",
      };
    }
    const data = await Notes.find(query);
    res.send({ data: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getNoteById = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    await Notes.find({ uploadedBy: userId }).then((data) => {
      res.send({ data: data });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { uploadNote, getNote, getNoteById };
