// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
// ** Custom Component Imports
import CustomInput from '../../apps/dates/PickersCustomInput'

// ** Types


// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3, 4),
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.default
  }))

  const showErrors = (field, valueLen, min) => {
    if (valueLen === 0) {
      return `${field} field is required`
    } else if (valueLen > 0 && valueLen < min) {
      return `${field} must be at least ${min} characters`
    } else {
      return ''
    }
  }

  const schema = yup.object().shape({
    company: yup.string().required(),
    country: yup.string().required(),
    email: yup.string().email().required(),
    contact: yup
      .number()
      .typeError('Contact Number field is required')
      .min(10, obj => showErrors('Contact Number', obj.value.length, obj.min))
      .required(),
    title: yup
      .string()
      .min(3, obj => showErrors('Event Title', obj.value.length, obj.min))
      .required(),
    username: yup
      .string()
      .min(3, obj => showErrors('Username', obj.value.length, obj.min))
      .required()
  })
  const defaultValues = {
    email: '',
    company: '',
    country: '',
    contact: '',
    title: '',
    username: ''
  }




const AddEventDrawer=props=>{
  // ** Hooks
  const { open, toggle } = props
  const dispatch = useDispatch()
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })


  const onSubmit = data => {
    dispatch(addUser({ ...data, role, currentPlan: plan }))
    toggle()
    reset()
  }
    const handleClose = () => {
        toggle()
        reset()
      }

    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date())
    return (
        <Drawer
        open={open}
        anchor='right'
        variant='temporary'
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 400, sm: 500 } } }}
         >
          <Header>
            <Typography variant='h6'>Add New Event</Typography>
            <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
          </Header>
          <Box sx={{ p: 5 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='title'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Event Title'
                  onChange={onChange}
                  placeholder='Event Name'
                  error={Boolean(errors.title)}
                />
              )}
            />
            {errors.title && <FormHelperText sx={{ color: 'error.main' }}>{errors.title.message}</FormHelperText>}
          </FormControl>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} >
            <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
                name='start_date'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                <DatePickerWrapper>
                <DatePicker
                selected={date}
                id='basic-input'
                onChange={date => setDate(date)}
                placeholderText='Click to select a date'
                customInput={<CustomInput label='Start Date' />}
              />
              </DatePickerWrapper>
                )}
            />
     
          </FormControl>
          </Grid>
          <Grid item xs={12} md={6} >
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
                name='end_date'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                <DatePickerWrapper>
                <DatePicker
                selected={date}
                id='basic-input'
                onChange={date => setDate(date)}
                placeholderText='Click to select a date'
                customInput={<CustomInput label='E Date' />}
              />
              </DatePickerWrapper>
                )}
            />
     
          </FormControl>
          </Grid>

          <Grid item xs={12} md={6} >
          <DatePickerWrapper>
            <DatePicker
            showTimeSelect
            selected={time}
            timeIntervals={15}
            showTimeSelectOnly
            dateFormat='h:mm aa'
            id='time-only-picker'
            timeCaption='Time Picker'
            onChange={date => setTime(date)}
            customInput={<CustomInput label='Time Only' />}
          />
          </DatePickerWrapper>
          </Grid>

          <Grid item xs={12} md={6} >
          <DatePickerWrapper>
            <DatePicker
            showTimeSelect
            selected={time}
            timeIntervals={15}
            showTimeSelectOnly
            dateFormat='h:mm aa'
            id='time-only-picker'
            timeCaption='Time Picker'
            onChange={date => setTime(date)}
            customInput={<CustomInput label='Time Only' />}
          />
          </DatePickerWrapper>
          </Grid>

          <Grid item xs={12} md={12}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='venue'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Venue'
                  onChange={onChange}
                  placeholder='Venue'
                  error={Boolean(errors.title)}
                />
              )}
            />
            {errors.title && <FormHelperText sx={{ color: 'error.main' }}>{errors.title.message}</FormHelperText>}
          </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
                Submit
              </Button>
              <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Grid>


          </Grid>
      
  
         
            </form>
          </Box>
        </Drawer>
    )
}

export default AddEventDrawer