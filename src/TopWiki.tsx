//todo
//needed

//extra
//testing
//readme

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ArticleCard } from './ArticleCard/ArticleCard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { getArticles } from './API/getArticles';
import { IArticleInfo } from './API/article.model';
import { ICountry, countries } from './countries.const';

import { styled } from "@mui/material/styles";
import './TopWiki.css';

function TopWiki() {
	const today = new Date();
	const yesterday = new Date();
	yesterday.setDate(today.getDate() - 1);
	const resultSizes = ["25", "50", "75", "100", "200"];

	const [date, setDate] = useState<Date>(yesterday);
	const [numResults, setNumResults] = useState<string>("100");
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [country, setCountry] = useState<ICountry | null>(null);
	const [articles, setArticles] = useState<IArticleInfo[]>([]);

	useEffect(() => {
    async function getWikipediaArticles() {
      const articles = await getArticles({date, numResults: parseInt(numResults), countryCode}).catch((e) => {
        // 404 means articles weren't found with filter criteria, so fail silently
        if (e?.response?.status !== 404) {
          throw e;
        }
      });
      if (articles === undefined) {
        setArticles([]);
      } else {
        setArticles(articles);
      }
    }
    getWikipediaArticles();
  }, [date, numResults, countryCode]);

	const handleResultsChange = (event: SelectChangeEvent) => {
    setNumResults(event.target.value as string);
  };

  const handleDateChange = (e: any) => {
    setDate(new Date(e.target.value));
  };

  const handleCountryChange = (value: ICountry | null) => {
    setCountryCode(value ? value.code : null)
    setCountry(value ? value : null);
  };

  const FilterContainer = styled("div")(({ theme }) => ({
    display: "flex",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      margin: "0 auto",
    },
  }));

  const ArticlesContainer = () => {
    if (articles.length === 0) {
      return (
        <Card sx={{ maxWidth: 600, margin: '20px auto 20px auto' }}>
          <CardContent>
            <Typography variant='h6'>
              No Articles Found
            </Typography>
            <Typography variant='subtitle2'>
              Change your country or date filtering
            </Typography>
          </CardContent>
        </Card>
    );
    } else {
      return articles.map((item) => <ArticleCard articleInfo={item}/>);
    }
  };



  return (
    <div className="App">
      <div className="sticky-header">
        <Box sx={{ paddingRight: "7px", display: {xs: "none", sm: "flex"} }}>
          <h3>TopWiki</h3>
        </Box>
        <FilterContainer>
          <Autocomplete
            className="country"
            size="small"
            disablePortal
            id="country"
            data-testid="country"
            options={countries}
            sx={{ width: 300, minWidth: 50 }}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.name} ({option.code})
              </Box>
            )}
            renderInput={(params) => <TextField {...params} label="Country" />}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => handleCountryChange(value)}
            value={country}
          />
          {/* todo: figure out what was going wrong with MUI DatePicker */}
          <TextField
            required
            size="small"
            label="Start Date:"
            type="date"
            className='datepicker'
            onChange={handleDateChange}
            value={date.toISOString().slice(0, 10)}
            sx={{ width: {xs: 300, sm: 150}, marginTop: "8px", marginBottom: {xs: "8px"} }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ max: yesterday.toISOString().slice(0, 10) }}
          />
          <Box>
            <FormControl sx={{ m: 1, minWidth: 130 }} size="small">
              <InputLabel id="num-results-label">Number of Results</InputLabel>
              <Select
                labelId="num-results-label"
                id="num-results"
                value={numResults}
                label="Number of Results"
                onChange={handleResultsChange}
              >
                {resultSizes.map((size) => <MenuItem value={size} key={size}>{size}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
        </FilterContainer>
      </div>
      {ArticlesContainer()}
    </div>
  );
}

export default TopWiki;
