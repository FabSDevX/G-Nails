import { Box, Button, TextField, Typography } from "@mui/material";
import { sendEmail } from "../../../utils/services/emailjs/emailSender";
import { Toaster, toast } from "sonner";
import "../../../utils/services/emailjs/emailjsConfig.js";
import { setDocumentByCollection } from "../../../utils/firebaseDB.js";

const inputStyles = { background: "white", width: "100%", borderRadius: "5px" };
const typographyStyles = {
  color: "black",
  fontWeight: "600",
};

export function ContactForm(emailData) {
  const email = emailData.email;
  async function handleSubmit(e) {
    e.preventDefault();
    const date = new Date();
    let consult = String(
      document.getElementsByName("contact-consult-field")[0].value
    );
    const name = String(
      document.getElementsByName("contact-name-field")[0].value
    );
    const phoneNumber = String(
      document.getElementsByName("contact-phone-field")[0].value
    );
    if (consult.length < 0) {
      consult = "(El usuario no ha proporcionado ninguna consulta)";
    }

    const options = {
      timeZone: "America/Costa_Rica", // Costa Rica
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    const dateFormat = new Intl.DateTimeFormat("es-CR", options);
    const todayDate = dateFormat.format(date);

    const templateParams = {
      email: email,
      name: name,
      phoneNumber: phoneNumber,
      consult: consult,
    };
    const response = sendEmail(templateParams);
    toast.promise(response, {
      loading: "Cargando...",
      success: (data) => {
        setDocumentByCollection("Consults", {
          clientName: name,
          date: todayDate,
          message: consult,
          phone: phoneNumber,
        });
        return "Mensaje enviado";
      },
      error: (err) => {
        return "Mensaje no enviado";
      },
    });
  }
  return (
    <Box
      id="#contact-form"
      sx={{
        background:
          "linear-gradient(90deg, rgba(242,188,212,1) 0%, rgba(249,136,181,1) 100%)",
        margin: "0 40px 40px 40px",
        borderRadius: "25px",
        height: {
          xs: "auto",
          sm: "550px",
        },
      }}
    >
      <Typography
        sx={{
          fontWeight: "700",
          fontFamily: "cursive",
          lineHeight: "120%",
          letterSpacing: "-0.02em",
          textAlign: "center",
          color: "black",
          padding: "30px 0",
          fontSize: {
            xs: "30px",
            sm: "48px",
          },
        }}
      >
        Envianos una consulta
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "repeat(1, 1fr)",
            gap: "30px",
            padding: "0 20px",

            display: {
              xs: "flex",
              sm: "grid",
            },
            flexDirection: {
              xs: "column",
            },
          }}
        >
          <Box>
            <Typography
              sx={{ ...typographyStyles, fontSize: { xs: "18px", sm: "24px" } }}
            >
              Nombre
            </Typography>
            <TextField
              name="contact-name-field"
              style={inputStyles}
              required
              id="outlined-required"
            />
          </Box>

          <Box>
            <Typography
              sx={{ ...typographyStyles, fontSize: { xs: "18px", sm: "24px" } }}
              style={typographyStyles}
            >
              Numero de telefono
            </Typography>
            <TextField
              name="contact-phone-field"
              style={inputStyles}
              required
              id="outlined-required"
            />
          </Box>
          <Box style={{ gridColumn: "span 2 / span 2" }}>
            <Typography
              sx={{ ...typographyStyles, fontSize: { xs: "18px", sm: "24px" } }}
              style={typographyStyles}
            >
              Consulta
            </Typography>
            <TextField
              style={inputStyles}
              id="outlined-multiline-static"
              name="contact-consult-field"
              multiline
              rows={5}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: {
              xs: "center",
              sm: "end",
            },
            margin: {
              xs: "20px auto",
              sm: "30px 20px 0 0",
            },
            paddingBottom: {
              xs: "30px",
            },
          }}
        >
          <Toaster />
          <Button
            variant="outlined"
            type="submit"
            sx={{
              background: "var(--primary-color)",
              display: "flex",
              color: "black",
              height: "70px",
              fontSize: "25px",
              borderRadius: "10px",

              width: {
                xs: "130px",
                sm: "200px",
              },
              "&:hover": {
                background: "var(--secondary-color)",
              },
            }}
          >
            Enviar
          </Button>
        </Box>
      </form>
    </Box>
  );
}
