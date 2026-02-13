<TopBar
        className="top-bar"
        title="Dashboard"
        searchPlaceholder="Search..."
        onSearch={handleSearch}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
    />
    <div className="search-controls">
        <input
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange}
            className="search-input"
        />
        <button onClick={handleSearchSubmit} className="search-button">Search</button>
    </div>