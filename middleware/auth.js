const hasAccess = (req, res,next)=>
{
        if (!req.session.userInfo)
        {
            res.redirect("/");
        }

        else
        {
            next();
        }
}
module.exports= hasAccess