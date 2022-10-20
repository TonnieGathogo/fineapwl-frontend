import { useRouter } from "next/router";
// ** Third Party Imports
import axios from 'axios'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

//components

import MemberView from 'src/components/members/view/MemberView'
const MemberProfile = ({id}) => {
    
  return (
   <MemberView id={id}/>
  )
}

export const getStaticPaths = async () => {
    const res = await axios.get('http://fineapwl.backend/api/members/get_members')
    const userData = await res.data.members

    const paths = userData.map(item => ({
      params: { id: `${item.id}` }
    }))
    return {
      paths,
      fallback: false
    }
  }

  export const getStaticProps = async ({ params }) => {
    return {
      props: {
      
        id: params?.id
      }
    }
  }

export default MemberProfile
