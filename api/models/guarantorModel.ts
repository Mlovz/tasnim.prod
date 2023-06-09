import mongoose from "mongoose";

const guarantorSchema = new mongoose.Schema(
  {
    seller: {
      type: Object,
      default: {},
    },
    products: {
      type: Array,
      default: [],
    },
    tariff: {
      type: Object,
      default: {},
    },
    term: {
      type: Object,
      default: {},
    },
    initial_fee: {
      type: String,
      default: "",
    },
    monthly_payment: {
      type: String,
      default: "",
    },
    installment_cost: {
      type: String,
      default: "",
    },
    trade_margin: {
      type: String,
      default: "",
    },

    last_name: {
      type: String,
      default: "",
    },
    first_name: {
      type: String,
      default: "",
    },
    middle_name: {
      type: String,
      default: "",
    },
    date_of_birth: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },

    place_of_work: {
      type: String,
      default: "",
    },
    organization_address: {
      type: String,
      default: "",
    },
    position: {
      type: String,
      default: "",
    },
    manager_contacts: {
      type: String,
      default: "",
    },
    main_income: {
      type: String,
      default: "",
    },
    other_income: {
      type: String,
      default: "",
    },

    marital_status: {
      type: Object,
      default: "",
    },

    number_of_children: {
      type: String,
      default: "",
    },

    housing: {
      type: Object,
      default: {},
    },
    rental_price: {
      type: String,
      default: "",
    },

    creditsAlimony: {
      type: Object,
      default: {},
    },
    payment_of_loans_and_alimony: {
      type: String,
      default: "",
    },

    user_relatives: {
      type: Array,
      default: [],
    },
    files: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      default: "processed",
    },
    status_payment: {
      type: String,
      default: "",
    },
    way_to_get: {
      type: String,
      default: "",
    },
    date_of_receiving: {
      type: String,
      default: "",
    },
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    createdAt: {
      type: Date,
      default: Date.now(),
    },

    installmentId: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("guarantor", guarantorSchema);
