import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

class AdultChannel extends Model<
    InferAttributes<AdultChannel>,
    InferCreationAttributes<AdultChannel>
> {
    declare id: string;
    declare name: string;
}

const adultChannelAttributes = {
    id: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: false,
    },
};

export async function initAdultChannel(sequelize: Sequelize): Promise<void> {
    AdultChannel.init(adultChannelAttributes, { sequelize });
    await AdultChannel.sync();
}

export async function addAdultChannel(id: string, name: string): Promise<string> {
    const channel = await AdultChannel.findOne({ where: { id: id } });
    if (!channel) {
        await AdultChannel.create({ id, name });
        return 'created';
    } else if (channel.name !== name) {
        const oldName = channel.name;
        channel.name = name;
        await channel.save();
        return `updated from ${oldName} to ${name}`;
    } else {
        return `exists`;
    }
}

export function deleteAdultChannel(id: string): Promise<number> {
    return AdultChannel.destroy({ where: { id } });
}

export function getAllAdultChannels(): Promise<AdultChannel[]> {
    return AdultChannel.findAll();
}
