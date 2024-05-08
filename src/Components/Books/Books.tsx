import React, { useEffect, useState } from 'react'
import { Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Book } from '../../Interface/Interface';




const host: string = process.env.REACT_APP_API_ENDPOINT ?? "";




const Books:React.FC = () => {
  const cardStyle: React.CSSProperties = {
    height: '95%',
    display: 'flex',
    flexDirection: 'column',
  };
  let suggestions=[]
  let CategorySuggestions=[]
  let AuthorSuggestions=[]

  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [searchCategory, setSearchCategory] = useState<string | null>(null);
  const [searchAuthor, setSearchAuthor] = useState<string | null>(null);



  const handleInputChange = (event: React.ChangeEvent<{}>, value: string | null) => {
      setSearchValue(value);
      
      suggestions = books
      .filter(book => book.name.toLowerCase().includes((searchValue || '').toLowerCase()))
      .map(book => book.name);
  };
  const handleCategoryChange = (event: React.ChangeEvent<{}>, value: string | null) => {
    setSearchCategory(value);
    
    CategorySuggestions = books
    .filter(book => book.category.toLowerCase().includes((searchCategory || '').toLowerCase()))
    .map(book => book.category);
};
const handleAuthorChange = (event: React.ChangeEvent<{}>, value: string | null) => {
  setSearchAuthor(value);
  
  AuthorSuggestions= books
  .filter(book => book.author.toLowerCase().includes((searchCategory || '').toLowerCase()))
  .map(book => book.author);
};

  
  
  
    const [books,setBooks] = useState<Book[]>([])
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
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
      
      useEffect(() => {
        if ((searchValue === null || searchValue === "") && (searchCategory === null || searchCategory === "") && (searchAuthor === null || searchAuthor === "")) {
          setFilteredBooks(books);
        } else if (searchCategory !== "" && searchCategory !== null) {
          const filtered = books.filter(book =>
            book.category.toLowerCase().includes(searchCategory.toLowerCase())
          );
          setFilteredBooks(filtered);
        }  else if (searchValue !== "" && searchValue !== null) {
          const filtered = books.filter(book =>
            book.name.toLowerCase().includes(searchValue.toLowerCase())
          );
          setFilteredBooks(filtered);
        }
        else if (searchAuthor !== "" && searchAuthor !== null) {
          const filtered = books.filter(book =>
            book.author.toLowerCase().includes(searchAuthor.toLowerCase())
          );
          setFilteredBooks(filtered);
        }
      }, [searchValue, searchCategory, books,searchAuthor]);

      suggestions = books
      .filter(book => book.name.toLowerCase().includes((searchValue || '').toLowerCase()))
      .map(book => book.name);
       
    CategorySuggestions = books
    .filter(book => book.category.toLowerCase().includes((searchCategory || '').toLowerCase()))
    .map(book => book.category);

    AuthorSuggestions= books
  .filter(book => book.author.toLowerCase().includes((searchAuthor || '').toLowerCase()))
  .map(book => book.author);
      
  return (
    <div style={{ padding: '20px' }}>
 <Grid container   spacing={2} className='m-4'>
      <Grid item  xs={12} sm={9} md={9} lg={3}>
        <Typography variant="h4" gutterBottom>
          Books
        </Typography>
      
      </Grid>
      <Grid item xs={12} sm={3} md={3} lg={3} >
        
      <Autocomplete
            value={searchCategory}
            onChange={(event, value) => handleCategoryChange(event, value)}
            options={CategorySuggestions}
            sx={{ width: 300 }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Category"
                    variant="outlined"
                    
                />
            )}
        />
      </Grid>
      <Grid item xs={12} sm={3} md={3} lg={3} >
      <Autocomplete
            value={searchAuthor}
            onChange={(event, value) => handleAuthorChange(event, value)}
            options={AuthorSuggestions}
            sx={{ width: 300 }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Author"
                    variant="outlined"
                    
                />
            )}
        />
      </Grid>
      <Grid item xs={12} sm={3} md={3} lg={3} >
      <Autocomplete
            value={searchValue}
            onChange={(event, value) => handleInputChange(event, value)}
            options={suggestions}
            sx={{ width: 300 }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search"
                    variant="outlined"
                    
                />
            )}
        />
      </Grid>
    </Grid>
    <Grid container spacing={3}>
      {filteredBooks.map((book, index) => (
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