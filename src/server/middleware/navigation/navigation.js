
const buildNavigation = (req, res, next) => {
    res.locals.navigationItems = [
        {
            title: "APIs",
            link: "/apis",
            active: req.path.indexOf('/apis') >= 0
        }
    ]
    next();
}

module.exports = {
    buildNavigation
};