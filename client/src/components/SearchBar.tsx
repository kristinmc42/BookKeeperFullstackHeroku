
// interfaces
interface SearchProps{
  onSubmit: any;
  placeholderText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const SearchBar = (props:SearchProps) => {
  // store the search data inputed by the user
  
  return (
    <form className="searchBarContainer" onSubmit={props.onSubmit}>
      <label htmlFor="searchBarContents">Search</label>
      <input type="text" id="searchBarContents" onChange={props.onChange } value={props.value } placeholder={props.placeholderText} />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
