import MessengerCustomerChat from "react-messenger-customer-chat";

const Messenger = () => {
  return (
    <div>
      <MessengerCustomerChat
        pageId="101323719167913"
        appId="3284833775173886"
        themeColor="#f44336"
        loggedInGreeting="Welcome to Unichem support service, we are here to assist you"
        loggedOutGreeting="Thank you for your interest in Unichem, we are glad to assist you."
        greetingDialogDisplay="fade"
        greetingDialogDelay="5000"
        // htmlRef="<REF_STRING>"
      />
    </div>
  );
};

export default Messenger;
