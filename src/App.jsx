import './App.css'
import GaugeComponent from 'react-gauge-component'
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faPersonDress } from '@fortawesome/free-solid-svg-icons';


function App() {
  const [height, setHeight] = useState(0)
  const [weight, setWeight] = useState(0)
  const [bmi, setBmi] = useState(0)
  const [category, setcategory] = useState('XXXX')
  const [alignment, setAlignment] = useState('Male');

  
// function for get height and weight
  const handleHeightChange = (event) => {
    const newHeight = event.target.value;
    setHeight(newHeight);
  };

  const handleWeightChange = (event) => {
    const newWeight = event.target.value;
    setWeight(newWeight);
  };

  // function for gender selection and background change
  let setImge
  let clr
  let bgc

  const handleChange = (event,newAlignment) => {
    setAlignment(newAlignment);
  };
  if (alignment == "Female") {
    setImge = '/girl.gif'
    clr = 'success'
    bgc='rgba(3, 120, 3)'
  } else {
    setImge = '/boy.gif'
    clr = 'primary'
    bgc='rgba(33, 72, 246)'
  }

// function for BMI calculation and category set
  const calculate = () => {
    let result = (weight / (height / 100) ** 2)
    isNaN(result) ? setBmi(0) : setBmi(result);

    if (result < 18.5) {
      setcategory("Under Weight")
    } else if (result >= 18.5 && result <= 24.9) {
      setcategory("Normal Weight")
    } else if (result > 24.9 && result <= 29.9) {
      setcategory("Over Weight")
    } else if (result > 29.9) {
      setcategory("Obese")
    } else {
      setcategory("")
    }

  }


// function for reset button
  const handleReset = () => {
    setHeight(0)
    setWeight(0)
    setBmi(0)
    setcategory('XXXX')
    setAlignment('Male')

  }
 


  return (
    <>

      <div className="row background w-100" >
        <div className="col-md-4"></div>
        <div className="col-md-4 m-1 mt-5">
          <div className='main m-1 mt-5  rounded-4 bg-dark pb-3  mb-3'>
            <h1 className='text-center text-white fw-bold pt-3 mt-3'>BMI CALCULATION</h1>
            {/* guage component */}
            <div className='guage'>
              <GaugeComponent
                type="semicircle"
                arc={{
                  colorArray: ['#fcfc56', '#28fc08', '#fccf53', '#f7ab40', '#ff894a', '#fc633d', '#fa3e34', '#fa0207'],
                  padding: 0.02,
                  subArcs:
                    [
                      { limit: 18.5 },
                      { limit: 24.9 },
                      { limit: 29.9 },
                      { limit: 34.9 },
                      { limit: 45 },
                      { limit: 60 },
                      { limit: 80 },
                      { limit: 100 }
                    ]
                }}
                labels={{
                  valueLabel: { formatTextValue: value => value },
                }}
                pointer={{ type: "blob", animationDelay: 0 }}

                value={bmi}
              />
            </div>
            <div className='row mt-2'>
              <div className="col-4">
                 {/* height display */}
              <div className='rounded-5 ms-2  d-flex align-items-center justify-content-center' style={{backgroundColor:`${bgc}`}}  >
                  <h6 className='text-white fw-bold  p-1'>{height} cm</h6>
                </div>
              </div>
              <div className="col-4">
                {/* result */}
              <h4 className='text-white fw-bold text-center'>{category}</h4>
              </div>
              <div className="col-4">
                {/* weight display */}
              <div className='rounded-5 d-flex align-items-center justify-content-center'  style={{backgroundColor:`${bgc}`}} >
                  <h6 className='text-white fw-bold p-1'>{weight} kg</h6>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-3">
                {/* height slider */}
                <Stack sx={{ height: 300 }} spacing={1} direction="column" className='ms-2 p-3 d-flex align-items-center'>
                  <Slider
                    orientation="vertical"
                    aria-label="Small steps"
                    defaultValue={0}
                    value={height}
                    onChange={handleHeightChange}
                    step={.1}
                    marks
                    min={50}
                    max={250}
                    name='height'
                    color={clr}
                    valueLabelDisplay="auto"
                    aria-labelledby="height"
                  />
                  <label className='text-white text-center'>Height</label>
                </Stack>
              </div>

              {/* center Image */}
              <div className="col-6  d-flex flex-column align-items-center justify-content-end pb-5">

                <div>
                  <img src={setImge} alt="" style={{ height: `${height + 50}px`, width: `${weight + 200}px`, minHeight: '150px', maxHeight: '250px', maxWidth: '450px', minWidth: '225px' }} />
                </div>
              </div>
                {/* weight section */}
              <div className="col-3">
                <Stack sx={{ height: 300 }} spacing={1} direction="column" className='me-2 p-3 d-flex align-items-center'>
                  <Slider
                    orientation="vertical"
                    aria-label="Small steps"
                    defaultValue={0}
                    value={weight}
                    onChange={handleWeightChange}
                    step={.1}
                    marks
                    min={25}
                    max={250}
                    valueLabelDisplay="auto"
                    color={clr}
                    aria-labelledby="height"
                  />
                  <label className='text-white text-center'>Weight</label>
                </Stack>
              </div>
            </div>

            <div className="row">
             
              <div className="col-4 d-flex justify-content-center align-items-center">
              <Button className='ms-2 fa-3 rounded-4' variant="contained" color='success' style={{ width: '110px', padding: '5px' }} onClick={calculate}>Calculate</Button>
              
              </div>
              {/* gender selection */}
              <div className="col-4 d-flex justify-content-center align-items-center">
                  <ToggleButtonGroup
                  color={clr}
                  value={alignment}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                >
                  <ToggleButton value="Male" className='fa-bold  border rounded-4 me-4 ' color={clr}><FontAwesomeIcon icon={faPerson} className='fs-5 fw-bold' /></ToggleButton>
                  <ToggleButton value="Female" className='fa-bold border rounded-4'><FontAwesomeIcon icon={faPersonDress} className='fs-5 fw-bold'/></ToggleButton>
                </ToggleButtonGroup>
              </div>
              
              <div className="col-4 d-flex justify-content-center align-items-center">
              <Button className='fw-bold fa-1 rounded-4'  variant="outlined" color="warning" style={{ width: '110px', padding: '5px' }} onClick={handleReset}>Reset</Button>
              </div>   
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>

    </>
  )
}

export default App




  

