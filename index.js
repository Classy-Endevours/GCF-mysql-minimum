const dotenv = require("dotenv");
dotenv.config();

const user = require("./user");

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.fetch = async (req, res) => {
  try {
    const users = await user.listUsers();
    let message = req.query.message || req.body.message || "Hello World!";
    res.status(200).send({ message, users });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
