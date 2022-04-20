import FacebookLogin from 'react-facebook-login';

const Facebook = () => {

    const responseFacebook = (response) => {
        console.log("res", response);
    }

    const componentClicked = (clicked) => {
        console.log("click", clicked);
    }
    return (
        <div>
            <FacebookLogin
                appId="1728909093950875"
                autoLoad={true}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook}
                render={renderProps => (
                    <button>This is my custom FB button</button>
                )} />
        </div>
    )
};

export default Facebook;