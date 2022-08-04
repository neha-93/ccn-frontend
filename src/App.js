import React, {useEffect} from 'react';
import axios from './server.js';
import StripeCheckoutButton from "./stripeCheckoutButton";
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const MyPaymentForm = () => {

  const [value, setValue] = React.useState();

  const [valueRadio, setValueRadio] = React.useState('VISA');

  const [name, setName] = React.useState('Your Name');
  const [cardNo, setCardNo] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('09/24');
  const [cvv, setCvv] = React.useState('111');
  const [address, setAddress] = React.useState('Your Address');

  const [stripePay, setStripePay] = React.useState(false);
  const [razorPay, setRazorPay] = React.useState(false);

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  function handleSubmit(e) {
    console.log(valueRadio);
    (async () => {
      const users = await axios.get(`/card/${valueRadio}`);
      console.log(users);
      setName(users.data.name);
      setAddress(users.data.address);
      setCvv(users.data.cvv);
      setCardNo(users.data.cardNo);
      console.log(name);
      console.log(cardNo);
      console.log(cvv);
      console.log(address);
    })();
  }


  useEffect(()=> {
    (async () => {
      const users = await axios.get("/card/RUPAY");
      console.log(users);
    })();
    
  }, []);

  return (
  <div>

  {!stripePay && <div>
  <FormControl>
    <FormLabel id="demo-controlled-radio-buttons-group">Select Card Type</FormLabel>
    <RadioGroup
      aria-labelledby="demo-controlled-radio-buttons-group"
      name="controlled-radio-buttons-group"
      value={valueRadio}
      onChange={(event, value)=> setValueRadio(value)}
    >
      <FormControlLabel value="VISA" control={<Radio />} label="VISA" />
      <FormControlLabel value="MASTERCARD" control={<Radio />} label="MasterCard" />
      <FormControlLabel value="AMERICAN_EXPRESS" control={<Radio />} label="American Express" />
      <FormControlLabel value="RUPAY" control={<Radio />} label="RuPay" />
    </RadioGroup>
  </FormControl>

  <br/>

  <Button variant="contained" type="submit"
        onClick= {handleSubmit}>Generate</Button>

  <br/>

  <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {valueRadio}
        </Typography>
        <Typography variant="h5" component="div">
        {cardNo}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Name: {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        CVV: {cvv}
        </Typography>
        <Typography variant="body2">
        Address: {address}
        </Typography>
      </CardContent>
      <CardActions>
        <a onClick={(event, value) => setStripePay(true) && console.log(stripePay)} target="_blank"><Button size="small" >Pay through Stripe gateway</Button></a>
        <a onClick={(event, value) => setRazorPay(true) && console.log(razorPay)} href="https://rzp.io/l/ePVVGrS2e"><Button size="small">Pay through RazorPay gateway</Button></a>
      </CardActions>
    </Card>
    </div>}
  
  {stripePay && <div className="stripe-checkout">
  <h1>Enter amount to be paid.</h1>
  <CurrencyTextField
		label="Amount"
		variant="standard"
		value={value}
		currencySymbol="$"
		//minimumValue="0"
		outputFormat="string"
		decimalCharacter="."
		digitGroupSeparator=","
		onChange={(event, value)=> setValue(value)}
    />
  <StripeCheckoutButton price = {value}/>
  </div>}
  </div>
  )
};

export default MyPaymentForm;