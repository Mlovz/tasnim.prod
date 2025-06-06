import catchAsync from "../../utils/catchAsync";
import Installment from "../../models/installmentModel";

const TarrifList = {
    ECONOM: "econom",
    EXPRESS: "express",
    STANDART: "standart",
    SUPER: "super",
}

export const installmentCtrl = {
    create: catchAsync(
        async (req, res, next) => {
            const {term, initial_fee, installment_cost} = req.body
            let now = new Date();
            let debts = []

            debts.push({
                title: 'Первоначальный взнос',
                paymentStatus: 'awaiting',
                price: initial_fee,
                date: `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`
            })

            const newPrice = Math.round((installment_cost - initial_fee) / term)

            for (let i = 0; i < term; i++) {
                now.setMonth(now.getMonth() + 1)
                let date = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`
                debts.push({
                    title: 'Ежемесячный платеж',
                    paymentStatus: 'awaiting',
                    price: newPrice,
                    date
                })
            }
            const newData = {
                ...req.body,
                user: req.user._id,
                debts
            };


            const data = await Installment.create(newData);

            let title = 'Ваша заявка принята.'
            let content = (data.tariff === TarrifList.ECONOM || data.tariff === TarrifList.STANDART)
                ? 'Поручителям необходимо подойти в офис ФД Тасним. Для дополнительной информации свяжитесь с нами. '
                : 'Вам придет сообщение на указанный номер телефона.'

            res.json({
                title,
                content,
                data,
            });
        }
    ),

    get: catchAsync(
        async (req, res, next) => {
            const newData = await Installment.findOne({
                status: "not finished",
            });

            res.json({
                msg: "Success",
                newData,
            });
        }
    ),


    getDebts: catchAsync(
        async (req, res, next) => {
            const newData = await Installment.find();

            res.json({
                msg: "Success",
                newData,
            });
        }
    ),

    delete: catchAsync(
        async (req, res, next) => {
            const post= await Installment.findOneAndDelete({
                _id: req.params.id,
                user: req.user._id,
            });

            res.json({
                msg: "Deleted!",
                newPost: {
                    ...post._doc,
                    user: req.user,
                },
            });
        }
    ),
};
