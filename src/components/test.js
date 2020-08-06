import FriendComponent ...

// <ul>
//     <div class="header">My friends</dv>
//     <FriendComponent name="bob"/>
//     <FriendComponent name="bill"/>
// </ul>

<body>
    <FriendsList friends=[...]/>
</body>

const FriendsList = (props) => {
    return (
        <ul>
            <div class="header">My friends</div>
            {
                props.friends.map((friend, id) => {
                    return (
                        <FriendComponent name={friend} />
                    )
                })
            }
        </ul>
    )
}

const FriendComponent = (props) => {
    return (
        <li>{props.name}</li>
    )
}