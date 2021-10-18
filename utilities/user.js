const users = [];

const joinUser = (id,username,room)=>{
    const user = {
        id,username,room
    };

    users.push(user);

    return user
};

const currentUser = (id)=>{
    return users.find(user =>  user.id === id)
};


const onLeave = (id)=>{
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index,1)[0]
    }
};


const userRoom = (room) => users.filter(user => user.room === room)


module.exports = {
    joinUser,
    currentUser,
    onLeave,
    userRoom
};