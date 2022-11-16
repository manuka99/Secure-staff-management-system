/**
 * User authorization
 */

const isWithRoles =
  (roles = []) =>
  (req, res, next) => {
    try {
      const user = req.user;
      if (!user || !roles.includes(user.type))
        return res.status(403).json({
          msg: `Authorization failed! Required Role: ${roles
            .join(",")
            .toString()}`,
        });
      next();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

module.exports = isWithRoles;
