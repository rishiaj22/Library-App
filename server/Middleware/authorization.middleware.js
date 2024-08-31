const authorize = (permittedRole)=>{
    return (req,res,next)=>{
        userRole = req.user.role
        if(permittedRole.includes(userRole)){
            next()
        }
        else{
            res.status(505).json({message:"You are not allowed to access this routes"})
        }
    }
}

module.exports = authorize;