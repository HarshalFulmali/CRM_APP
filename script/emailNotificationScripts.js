const userRegistrationNotification = (user,email) =>{

    return {
        subject:"Registered To CRM App",
        html:`
        <div>
        <h5> Hello, ${user.name}</h5>
        <br>
        <br>

        you have successfully registered with ${user.email}
        <br>
        Your userId at time of login will be ${user.userId}
        <br>
        <br>
        <br>
        <img height="100" width="100" src="https://images.ctfassets.net/lzny33ho1g45/6HrRibvXMoNeGMPq3CIg8S/3febce9eae1d8e03f100178a5ffecec2/best-crm-app-00-hero.jpg?w=1520&fm=jpg&q=30&fit=thumb&h=760"/>
        </div>
        `
    }
}

const createdTicketNotification = (ticket,user) => {
    return {
        subject:"You have generated ticket",
        text:`Your ticket title is ${ticket.title}`,
        html:`
        <div>
        <h5>Hello, ${user.name}</h5>
        <h5> You have registerd ticket with userId ${user.userId}</h5>
        <br>
        <br>
        Your ticket title is ${ticket.title}
        <br>
        Your ticket description is ${ticket.description}
        <br>
        <br>
        <br>
        <img height="100" width="100" src="https://images.ctfassets.net/lzny33ho1g45/6HrRibvXMoNeGMPq3CIg8S/3febce9eae1d8e03f100178a5ffecec2/best-crm-app-00-hero.jpg?w=1520&fm=jpg&q=30&fit=thumb&h=760"/>
        </div>
        `
    }
}

module.exports ={
    userRegistrationNotification,
    createdTicketNotification
}