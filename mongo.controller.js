const User = require("./mongo.config");

class UserController {
    static async createUser(req, res) {
        try {
            const { username, email, password, age, hobbies } = req.body;
            const newUser = await User.create({ username, email, password, age, hobbies });
            await User.create(newUser);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async updateUser(req, res) {
        try {
            const { username, email, password, age, hobbies } = req.body;
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { username, email, password, age, hobbies },
            );
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async deleteUser(req, res) {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = UserController;