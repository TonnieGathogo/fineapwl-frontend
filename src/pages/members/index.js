import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'


// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'
// custom imports
import PageHeader from 'src/@core/components/page-header'
import TableHeader from 'src/views/pages/members/TableHeader'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { useSettings } from 'src/@core/hooks/useSettings'
// ** Icons Imports
import Laptop from 'mdi-material-ui/Laptop'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import CogOutline from 'mdi-material-ui/CogOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import ComposePopup from 'src/components/email/ComposePopup'
// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'


// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData } from 'src/store/apps/member'

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}
const AvatarWithImageLink = styled(Link)(({ theme }) => ({
  marginRight: theme.spacing(3)
}))

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

const renderClient = row => {
  
    return (
      <AvatarWithoutImageLink href={`/members/view/${row.id}`}>
        <CustomAvatar
          skin='light'
          color={row.avatarColor || 'error'}
          sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
        >
          {getInitials(row.fname ? row.lname : 'John Doe')}
        </CustomAvatar>
      </AvatarWithoutImageLink>
    )
  
}

// ** Styled component for the link inside menu
const MenuItemLink = styled('a')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  padding: theme.spacing(1.5, 4),
  color: theme.palette.text.primary
}))

const RowOptions = ({ id }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(deleteUser(id))
    handleRowOptionsClose()
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <DotsVertical />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem sx={{ p: 0 }}>
          <Link href={`/members/view/${id}`} passHref>
            <MenuItemLink>
              <EyeOutline fontSize='small' sx={{ mr: 2 }} />
              View
            </MenuItemLink>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose}>
          <PencilOutline fontSize='small' sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteOutline fontSize='small' sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}
const columns = [
  {
    flex: 0.2,
    minWidth: 250,
    field: 'name',
    headerName: 'User',
    renderCell: ({ row }) => {
      const { id, username,fname,lname,email } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Link href={`/members/view/${id}`} passHref>
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                {fname} {lname}
              </Typography>
            </Link>
            <Link href={`/members/view/${id}`} passHref>
              <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
                @{email}
              </Typography>
            </Link>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.06,
    minWidth: 35,
    field: 'membership_no',
    headerName: 'Mem No',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.membership_no}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'phone',
    headerName: 'Phone',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.phone}
        </Typography>
      )
    }
  },

  {
    flex: 0.05,
    minWidth: 10,
    field: 'gender',
    headerName: 'Gender',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
          {row.gender}
        </Typography>
      )
    }
  },

  {
    flex: 0.15,
    minWidth: 120,
    field: 'created_at',
    headerName: 'Date Joined',
    renderCell: ({ row }) => <Typography variant='body2'>{row.created_at}</Typography>
  },


  
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row.id} />
  }
]


const Members = () => {
  
    // ** State
    const theme = useTheme()
    const { settings } = useSettings()
    const [gender, setGender] = useState('')
    const [value, setValue] = useState('')
    const [pageSize, setPageSize] = useState(10)
    //const [addUserOpen, setAddUserOpen] = useState(false)
    const [composeOpen, setComposeOpen] = useState(false)
    const [mailDetailsOpen, setMailDetailsOpen] = useState(false)
    const composePopupWidth = mdAbove ? 854 : smAbove ? 620 : '100%'
    const { skin, appBar, footer, layout, navHidden, direction } = settings
    const toggleComposeOpen = () => setComposeOpen(!composeOpen)
    const lgAbove = useMediaQuery(theme.breakpoints.up('lg'))
    const mdAbove = useMediaQuery(theme.breakpoints.up('md'))
    const smAbove = useMediaQuery(theme.breakpoints.up('sm'))
    
    // ** Hooks
    const dispatch = useDispatch()
    const store = useSelector(state => state.member)
    useEffect(() => {
      dispatch(
        fetchData({
          gender,
          q: value,
        })
      )
    }, [dispatch,gender,value])
  
    const handleFilter = useCallback(val => {
      setValue(val)
    }, [])
  
    const handleRoleChange = useCallback(e => {
      setRole(e.target.value)
    }, [])
  
    const handlePlanChange = useCallback(e => {
      setPlan(e.target.value)
    }, [])
  
    const handleGenderChange = useCallback(e => {
      setGender(e.target.value)
    }, [])
    const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)
    const calculateAppHeight = () => {
      return `(${
        (appBar === 'hidden' ? 0 : theme.mixins.toolbar.minHeight) * (layout === 'horizontal' && !navHidden ? 2 : 1) +
        (footer === 'hidden' ? 0 : 56)
      }px + ${theme.spacing(6)} * 2)`
    }
  
    return (
      
      <Grid container spacing={6}>
         <PageHeader
        title={<Typography variant='h5'>Registered Members List</Typography>}
        subtitle={
          <Typography variant='body2'>
           Members Available
          </Typography>
        }
      />
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item sm={4} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='role-select'>Select Role</InputLabel>
                    <Select
                      fullWidth
                      value={gender}
                      id='select-role'
                      label='Select Role'
                      labelId='role-select'
                      onChange={handleRoleChange}
                      inputProps={{ placeholder: 'Select Role' }}
                    >
                      <MenuItem value=''>Select Role</MenuItem>
                      <MenuItem value='admin'>Admin</MenuItem>
                      <MenuItem value='author'>Author</MenuItem>
                      <MenuItem value='editor'>Editor</MenuItem>
                      <MenuItem value='maintainer'>Maintainer</MenuItem>
                      <MenuItem value='subscriber'>Subscriber</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={4} xs={12}>
                  {/* <FormControl fullWidth>
                    <InputLabel id='plan-select'>Select Plan</InputLabel>
                    <Select
                      fullWidth
                      value={plan}
                      id='select-plan'
                      label='Select Plan'
                      labelId='plan-select'
                      onChange={handlePlanChange}
                      inputProps={{ placeholder: 'Select Plan' }}
                    >
                      <MenuItem value=''>Select Plan</MenuItem>
                      <MenuItem value='basic'>Basic</MenuItem>
                      <MenuItem value='company'>Company</MenuItem>
                      <MenuItem value='enterprise'>Enterprise</MenuItem>
                      <MenuItem value='team'>Team</MenuItem>
                    </Select>
                  </FormControl> */}
                </Grid>
                <Grid item sm={4} xs={12}>
                 <FormControl fullWidth>
                  <InputLabel id='gender-select'>Select Gender</InputLabel>
                  <Select
                    fullWidth
                    value={gender}
                    id='gender-status'
                    label='Select Gender'
                    labelId='gender-select'
                    onChange={handleGenderChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value=''>Select Role</MenuItem>
                    <MenuItem value='f'>Female</MenuItem>
                    <MenuItem value='m'>Male</MenuItem>
                    
                  </Select>
                 </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
         
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableHeader value={value} handleFilter={handleFilter} toggleComposeOpen={toggleComposeOpen} toggle={toggleAddUserDrawer}  />
            <DataGrid
              autoHeight
              rows={store.data}
              columns={columns}
              checkboxSelection
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[10, 25, 50]}
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            />
          </Card>
        </Grid>
        <Grid item xs={12}>
        <ComposePopup
        mdAbove={mdAbove}
        composeOpen={composeOpen}
        composePopupWidth={composePopupWidth}
        toggleComposeOpen={toggleComposeOpen}
      />
          </Grid>

      
      </Grid>

  


     
      
    )
}

export default Members
