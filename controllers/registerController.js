const Users = require('../models/Users');

const handleNewUser = async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res
      .status(400)
      .json({ message: 'Email is required.', success: false });

  try {
    const validateEmail = async email => {
      let user = await Users.findOne({ email });
      return user ? false : true;
    };

    let emailNotRegistered = await validateEmail(email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already registered.`,
        success: false,
      });
    }

    const newUser = new Users({
      email,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: `${err.message}` });
  }
};

module.exports = handleNewUser;
