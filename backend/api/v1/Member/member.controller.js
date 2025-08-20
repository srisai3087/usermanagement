const { default: Member } = require('../../../Models/member.schema');

const addMember = async (req, res) => {
  try {
    console.log(req.body);
    const member = await Member.create(req.body);

    res.status(200).json({
      isSuccess: true,
      member,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      isSuccess: false,
      message: 'internal server error',
    });
  }
};

const getHubMembers = async (req, res) => {
  try {
    const hubMembers = await Member.find({ hubName: req.params.hub });

    res.status(200).json({
      isSuccess: true,
      hubMembers,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      isSuccess: false,
      message: 'internal server error',
    });
  }
};

const deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.memId);

    res.status(200).json({
      isSuccess: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      isSuccess: false,
      message: 'Internal Server error',
    });
  }
};

module.exports = {
  addMember,
  getHubMembers,
  deleteMember,
};
