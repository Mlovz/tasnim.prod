import catchAsync from "../../utils/catchAsync";
import User from '../../models/userModel'


export const userCtrl = {
    updateProfile: catchAsync(async (req, res, next) => {

        const newUser = await User.findOneAndUpdate({_id: req.user._id}, req.body)

        return res.json({
            title: 'Профиль обновлен.',
            user: newUser
        })
    })
}