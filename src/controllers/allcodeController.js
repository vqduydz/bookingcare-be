import AllcodeServices from '../services/Allcode';

const handleGetAllcode = async (req, res) => {
  let type = req.query.type;
  let result = await AllcodeServices.getAllcode(type);
  const { code, ...data } = result;
  return res.status(code).json({
    ...data,
  });
};

const handleCreateNewAllcode = async (req, res) => {
  let result = await AllcodeServices.createNewAllcode(req.body);
  const { code, data } = result;
  return res.status(code).json({
    ...data,
  });
};

const handleUpdateAllcode = async (req, res) => {
  let dataUpdate = req.body;
  let result = await AllcodeServices.updateAllcodeData(dataUpdate);
  const { code, data } = result;
  return res.status(code).json({
    ...data,
  });
};

const handleDeleteAllcode = async (req, res) => {
  let AllcodeId = req.body.id;
  if (AllcodeId) {
    let result = await AllcodeServices.deleteAllcodeById(AllcodeId);
    const { code, data } = result;
    return res.status(code).json({
      ...data,
    });
  } else {
    return res.status(404).json({
      status: false,
      message: 'Allcode does not exist',
    });
  }
};

export default {
  handleGetAllcode,
  handleCreateNewAllcode,
  handleUpdateAllcode,
  handleDeleteAllcode,
};
