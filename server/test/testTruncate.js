const User = require('../model/user');

module.exports = {
    async truncateData() {
        // Truncate `user` table
        await User.testTruncateItem();
        await User.testTruncateRestaurant();
        await User.testTruncateCart();
        await User.testTruncate();
    }
}