def iterate_over_unique_cells(table, func):
    """
    Iterate over all unique cells in a table (ignoring merged/extended cells)
    """
    # Get unique cells (ignoring merged/extended cells)
    cells = set(cell for row in table.rows for cell in row.cells)
    for cell in cells:
        func(cell)