import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Book } from '../../Interface/Interface';

interface Props {
    books: Book[];
}

const Search: React.FC<Props> = ({ books }) => {
    
    let suggestions=[]
    const [searchValue, setSearchValue] = useState<string | null>(null);

    const handleInputChange = (event: React.ChangeEvent<{}>, value: string | null) => {
        setSearchValue(value);
        suggestions = books
        .filter(book => book.name.toLowerCase().includes((searchValue || '').toLowerCase()))
        .map(book => book.name);
    };

     suggestions = books
        .filter(book => book.name.toLowerCase().includes((searchValue || '').toLowerCase()))
        .map(book => book.name);

    return (
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
    );
};

export default Search;
