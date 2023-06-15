import { useState } from "react";
import ViewOrders from "./ViewOrders";
import AuthService from "../../services/auth.service";
import CreateOrder from "./CreateOrder";
import { useEffect } from "react";

const OrderUsers = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
  const [showAdminFunctions, setShowAdminFunctions] = useState(false);
  const [showUserFunctions, setShowUserFunctions] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdminFunctions(user.roles.includes("ROLE_ADMIN"));
      setShowUserFunctions(user.roles.includes("ROLE_USER"));
    }
  }, []);

    return (
        <div>
            {showAdminFunctions && (<ViewOrders/>)}
            {showUserFunctions && (<CreateOrder/>)}
        </div>
    )
}
export default OrderUsers;