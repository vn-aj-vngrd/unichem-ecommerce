import MessengerCustomerChat from "react-messenger-customer-chat";

const Messenger = () => {
  return (
    <div>
      <MessengerCustomerChat
        pageId="101323719167913"
        appId="3284833775173886"
        themeColor="#f44336"
        loggedInGreeting="Welcome to the Unichem support service. We are here to assist you."
        loggedOutGreeting="Thank you for your interest in Unichem. We are glad to assist you."
        greetingDialogDisplay="show"
        greetingDialogDelay={5000}
        // htmlRef="<REF_STRING>"
      />
    </div>
  );
};

export default Messenger;
