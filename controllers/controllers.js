const saySomething = (req, res) => {
  res.status(200).json({
    body: 'Hello from the server!',
  });
};

module.exports.saySomething = saySomething;
