const mongoose = require("mongoose");

const blackListTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required to added in BlackList"]
    }
},{
    timestamps: true
})

const tokenBlackListModel = mongoose.model("blacklistToken", blackListTokenSchema)

module.exports = tokenBlackListModel