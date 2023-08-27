import { motion } from "framer-motion";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/ui/Button";
import Dropdown from "../../components/ui/Dropdown";
import { tickets } from "../../data/pricing";
import Icon from "../../components/ui/Icon";
import {
  BsFillStarFill,
  BsFillTicketPerforatedFill,
  BsFillCreditCard2BackFill,
  BsBank,
  BsArrowLeft,
} from "react-icons/bs";
import Swal from "sweetalert2";
import PaystackPop from "@paystack/inline-js";
import { fetchData } from "../../utils/fetchData";

function Payment() {
  const { user, addUser, setLoader } = useAppContext();
  const navigate = useNavigate();
  const ticketRef = useRef(null);
  const paymentRef = useRef(null);
  const recordRef = useRef(null);
  const [switched, setSwitched] = useState(false);

  const handleSwitch = (event) => {
    event.preventDefault();
    if (
      ticketRef.current.textContent !== "Ticket type" &&
      paymentRef.current.textContent !== "Payment type"
    ) {
      recordRef.current = {
        ticket: ticketRef.current.textContent,
        payment: paymentRef.current.textContent,
      };
      setSwitched(true);
    } else {
      Swal.fire({
        title: "Failed",
        text: "One or more fields empty",
        icon: "error",
        confirmButtonText: "Try again",
        confirmButtonColor: "var(--clr-secondary-400)",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: import.meta.env.VITE_KEY,
      amount:
        Number(
          recordRef.current.ticket.slice(
            recordRef.current.ticket.indexOf("-") + 2
          )
        ) * 100,
      email: user.email,
      firstname: user.username.slice(0, user.username.indexOf(" ")),
      lastname: user.username.slice(user.username.indexOf(" ") + 1),
      onSuccess(transaction) {
        Swal.fire({
          title: "Payment Successful",
          text: `Reference ID: ${transaction.reference}`,
          icon: "success",
          confirmButtonText: "Continue",
          confirmButtonColor: "var(--clr-secondary-400)",
        }).then(() => {
          setLoader(true);
          fetchData("ticket", "post", {
            username: user.username,
            ticket_type: recordRef.current.ticket
              .slice(0, recordRef.current.ticket.indexOf("-") - 1)
              .toUpperCase(),
          }).then((data) => {
            setLoader(false);
            if (data.user?.username) {
              addUser({
                ...user,
                seat_number: data.user.seat_number,
                ticket_id: data.user.ticket_id,
                ticket_type: data.user.ticket_type,
              });
              navigate("/profile");
            } else {
              Swal.fire({
                title: "Server error",
                text: "Failed to update server with ticket details",
                icon: "error",
                confirmButtonText: "Try again",
                confirmButtonColor: "var(--clr-secondary-400)",
              });
            }
          });
        });
      },
      onCancel() {
        Swal.fire({
          title: "Terminated",
          text: "Transaction declined",
          icon: "error",
          confirmButtonText: "Continue",
          confirmButtonColor: "var(--clr-secondary-400)",
        });
      },
    });
  };

  useEffect(() => {
    if (!user?.username) {
      navigate("/login");
    } else if (user?.ticket_id) {
      navigate("/profile");
    }
    setLoader(false);
  }, []);

  const ticketItems = tickets.map((ticket) => {
    return {
      value: `${ticket.type} - ${ticket.price}`,
      icon: () => (
        <Icon
          icon={(fill) => <BsFillStarFill data-fill={fill} className="icon" />}
          fill={ticket.iconFill}
        />
      ),
    };
  });

  const paymentItems = [
    {
      value: "Bank transfer",
      icon: () => <BsBank />,
    },
    {
      value: "Card payment",
      icon: () => <BsFillCreditCard2BackFill />,
    },
  ];

  return (
    <motion.section
      className="payment"
      key="payment"
      transition={{ duration: 0.5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {!switched ? (
        <motion.h1
          key="head1"
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          Complete the process to get your ticket for the event.
        </motion.h1>
      ) : (
        <motion.h1
          key="head2"
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          Order Confirmation
        </motion.h1>
      )}
      {!switched ? (
        <motion.form
          onSubmit={handleSwitch}
          key="first"
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Dropdown
            items={ticketItems}
            initial="Ticket type"
            image={() => <BsFillTicketPerforatedFill />}
            ref={ticketRef}
          />
          <Dropdown
            items={paymentItems}
            initial="Payment type"
            image={() => <BsFillCreditCard2BackFill />}
            ref={paymentRef}
          />
          <Button type="submit" color="secondary">
            Proceed with payment
          </Button>
        </motion.form>
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          key="second"
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <button className="back" onClick={() => setSwitched(false)}>
            <BsArrowLeft />
            <span>Go back</span>
          </button>
          <div className="info">
            <div>
              <span>Ticket type</span>
              <span>
                {recordRef.current.ticket.slice(
                  0,
                  recordRef.current.ticket.indexOf("-")
                )}
              </span>
            </div>
            <div>
              <span>Price</span>
              <span>
                {`N${recordRef.current.ticket.slice(
                  recordRef.current.ticket.indexOf("-") + 2
                )}.00`}
              </span>
            </div>
            <div>
              <span>Payment method</span>
              <span>{recordRef.current.payment}</span>
            </div>
          </div>
          <Button type="submit" color="secondary">
            Confirm payment
          </Button>
        </motion.form>
      )}
    </motion.section>
  );
}

export default Payment;
