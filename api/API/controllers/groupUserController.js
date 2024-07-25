const { GroupUser, User, Group } = require('../models/associations');

class GroupUserController {
    static async create(req, res) {
        try {
            const authUser = req.user;
            if (!authUser || authUser.role !== 'super_admin') {
                return res.status(403).json({ message: 'Forbidden' });
            }

            const { groupId, userId } = req.body;

            const groupExists = await Group.findByPk(groupId);
            const userExists = await User.findByPk(userId);

            if (!groupExists || !userExists) {
                return res.status(404).json({ message: 'Group or User not found' });
            }

            const newGroupUser = await GroupUser.create({
                groupId,
                userId,
                createdBy: authUser.id,
                updatedBy: authUser.id
            });

            res.status(201).json({ message: 'GroupUser created successfully', groupUser: newGroupUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }
    
    static async read(req, res) {
        try {
            const groupUserId = req.params.id;
            const groupUser = await GroupUser.findByPk(groupUserId);
            if (!groupUser) {
                return res.status(404).json({ message: 'GroupUser not found' });
            }
            res.status(200).json({ groupUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    static async update(req, res) {
        try {
            const groupUserId = req.params.id;
            const { groupId, userId } = req.body;
            const authUser = req.user;

            if (!authUser || authUser.role !== 'super_admin') {
                return res.status(403).json({ message: 'Forbidden' });
            }

            const groupUser = await GroupUser.findByPk(groupUserId);
            if (!groupUser) {
                return res.status(404).json({ message: 'GroupUser not found' });
            }

            await groupUser.update({ groupId, userId, updatedBy: authUser.id });
            res.status(200).json({ message: 'GroupUser updated successfully', groupUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    static async delete(req, res) {
        try {
            const groupUserId = req.params.id;
            const authUser = req.user;

            if (!authUser || authUser.role !== 'super_admin') {
                return res.status(403).json({ message: 'Forbidden' });
            }

            const numDeleted = await GroupUser.destroy({ where: { id: groupUserId } });
            if (numDeleted === 0) {
                return res.status(404).json({ message: 'GroupUser not found' });
            }

            res.status(200).json({ message: 'GroupUser deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }
}

module.exports = GroupUserController;
