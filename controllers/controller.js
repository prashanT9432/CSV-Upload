const csv = require("csv-parser");
const path = require("path");
const CSV = require("../model/csv");
const fs = require("fs");

function renderFiles(files) {
  const uFiles = [];
  for (let f of files) {
    uFiles.push({
      id: f._id,
      name: f.name,
      fileName: f.fileName,
      date: `${f.uploadedOn.getDate()} / ${f.uploadedOn.getMonth()} / ${f.uploadedOn.getFullYear()}`,
      time:
        f.uploadedOn.getHours() > 12
          ? `${f.uploadedOn.getHours() - 12} : ${f.uploadedOn.getMinutes()}`
          : `${f.uploadedOn.getHours()} : ${f.uploadedOn.getMinutes()}`,
    });
  }
  return uFiles;
}

module.exports.home = async (req, res) => {
  const files = await CSV.find({});
  const uFiles = renderFiles(files);
  return res.render("homepage", { msg: req.flash("message"), files: uFiles });
};

module.exports.upload = async (req, res) => {
  const files = await CSV.find({});
  const uFiles = renderFiles(files);
  if (req.file === undefined) {
    req.flash("message", "Please upload only CSV file.");
    return res.redirect("/");
  }
  const file = await CSV.create({
    name: req.file.originalname,
    fileName: req.file.filename,
  });
  return res.redirect("/");
};

module.exports.details = (req, res) => {
  const result = [];
  const { name } = req.params;
  const file = path.join(path.resolve(), "assets", "uploads", name);
  fs.createReadStream(file)
    .pipe(csv())
    .on("data", (data) => result.push(data))
    .on("end", () => {
      return res.render("details", { file: result });
    });
};

module.exports.delete = async (req, res) => {
  try {
    const { fileName } = req.params;
    const filePath = path.join(path.resolve(), "assets", "uploads", fileName);
    fs.unlinkSync(filePath);
    await CSV.findOneAndDelete({ fileName: fileName });
    return res.redirect("/");
  } catch (err) {
    const files = await CSV.find({});
    const uFiles = renderFiles(files);
    return res.render("homepage", { msg: "Can not delete", files: uFiles });
  }
};
