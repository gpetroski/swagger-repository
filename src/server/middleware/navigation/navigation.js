
const buildNavigation = (req, res, next) => {
    res.locals.navigationItems = [
        {
            title: "Dashboards",
            link: "/dashboards",
            active: req.path.indexOf('/dashboards') >= 0
        },
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