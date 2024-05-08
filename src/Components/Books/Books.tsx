import React, { useEffect, useState } from 'react'
import { Book } from '../../Interface/Interface';
import { Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';
import Search from '../Search/Search';




const host: string = process.env.REACT_APP_API_ENDPOINT ?? "";




const Books:React.FC = () => {
  const cardStyle: React.CSSProperties = {
    height: '95%',
    display: 'flex',
    flexDirection: 'column',
  };
  
  
    const [books,setBooks] = useState<Book[]>([])
    const fetchBooks = async () => {
        try {
          const response = await fetch(host+ "/api/Library/getBooks",
            {
            method:'GET',
            headers:{
             
            
              'Content-Type':'application/json'
            }
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          setBooks(result.data);
          console.log(result.data)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      useEffect(() => {
        fetchBooks()
      
        return () => {
          
        }
      }, [])
      
  return (
    <div style={{ padding: '20px' }}>
    <Typography variant="h4" gutterBottom>
      Books
    </Typography>
    <Search books={books}/>
    <Grid container spacing={3}>
      {books.map((book, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card style={cardStyle} sx={{padding:2}}>
          <img
            src={book.image}
            
            
            style={{width:"60%" , height:"270px"}}
          />
            
          {/* <CardMedia
                style={mediaStyle}
                image={book.image}
                title={book.name}
              /> */}
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {book.name}
              </Typography>
              <Typography variant="h6" color="textSecondary" component="p">
                {book.author}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {book.category}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>
  )
}

export default Books