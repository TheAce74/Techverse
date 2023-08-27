import { motion } from "framer-motion";
import { useAppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/ui/Button";
import { useAuthentication } from "../../hooks/useAuthentication";
import { BiSolidPencil } from "react-icons/bi";
import Modal from "react-modal";
import Swal from "sweetalert2";
import axios from "axios";

function Profile() {
  const { user, setLoader, addUser } = useAppContext();
  const { logout } = useAuthentication();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const imageRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(user.image);

  Modal.setAppElement("#root");

  const handleCloseModal = (bool) => {
    setModalIsOpen(bool);
    setImageSrc(user.image);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    setLoader(true);
    const image = imageRef.current.files[0];
    const url = "https://techverse-v2.onrender.com/user/upload";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("file", image);
    axios
      .post(url, formData, config)
      .then((response) => {
        addUser({
          ...user,
          image: `https://techverse-v2.onrender.com/fileinfo/${response.data.file.filename}`,
        });
        handleCloseModal(false);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        Swal.fire({
          title: "Failed!",
          text: err.message,
          icon: "error",
          confirmButtonText: "Try again",
          confirmButtonColor: "var(--clr-secondary-400)",
        });
      });
  };

  const validFileType = (file) => {
    const fileTypes = ["image/png", "image/jpeg", "image/jpg"];
    return fileTypes.includes(file.type);
  };

  const returnFileSize = (file) => {
    return file.size;
  };

  const handleChange = () => {
    const image = imageRef.current.files[0];
    if (validFileType(image) && returnFileSize(image) <= 3145728) {
      setImageSrc(URL.createObjectURL(image));
    } else if (!validFileType(image)) {
      Swal.fire({
        title: "Invalid File Type",
        text: "Only png, jpeg and jpg file types are accepted",
        icon: "error",
        confirmButtonText: "Try again",
        confirmButtonColor: "var(--clr-secondary-400)",
      });
    } else {
      Swal.fire({
        title: "File Too Large",
        text: "Image size must be at most 3MB",
        icon: "error",
        confirmButtonText: "Try again",
        confirmButtonColor: "var(--clr-secondary-400)",
      });
    }
  };

  useEffect(() => {
    if (!user?.username) {
      navigate("/login");
    }
    setLoader(false);
  }, []);

  return (
    <motion.section
      className="profile"
      key="profile"
      transition={{ duration: 0.5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="wrapper">
        <div>
          <div className="user">
            <span aria-hidden="true" data-color={user.color}>
              {imageSrc ? (
                <img src={imageSrc} alt="" />
              ) : (
                <span aria-hidden="true">
                  {user.username[0]?.toUpperCase()}
                </span>
              )}
              <button onClick={() => handleCloseModal(true)}>
                <BiSolidPencil />
              </button>
            </span>
          </div>
          <h2>
            <span>
              Hello, <b>{user.username.slice(0, user.username.indexOf(" "))}</b>
            </span>
            <span>Welcome to your profile</span>
          </h2>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => handleCloseModal(false)}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
        >
          <h2>Upload Photo</h2>
          <form onSubmit={handleUpload}>
            <input
              type="file"
              className="file"
              required
              ref={imageRef}
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleChange}
            />
            <Button color="secondary" type="submit">
              Submit
            </Button>
          </form>
        </Modal>
        <h1>Your personal information</h1>
        <h3>Firstname</h3>
        <p>{user.username.slice(0, user.username.indexOf(" "))}</p>
        <h3>Lastname</h3>
        <p>{user.username.slice(user.username.indexOf(" ") + 1)}</p>
        <h3>Email address</h3>
        <p>{user.email}</p>
        <Button color="secondary" handleLogout={logout}>
          Log out
        </Button>
        {user?.ticket_id ? (
          <div>
            <h4>Ticket details</h4>
            <p>Ticket type - {user.ticket_type}</p>
            <p>Ticket ID - {user.ticket_id}</p>
            <p>Seat number - {user.seat_number}</p>
          </div>
        ) : (
          <div>
            <h3>You&apos;ve not secured your spot yet?</h3>
            <Link to="/payment">
              <Button color="secondary">Purchase ticket</Button>
            </Link>
          </div>
        )}
      </div>
    </motion.section>
  );
}
export default Profile;
