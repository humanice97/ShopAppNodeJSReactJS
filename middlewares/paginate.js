const paginate = (defaultLimit = 5) => async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.limit, 10)|| defaultLimit;
    const offset = (page - 1) * pageSize
    req.pagination = {
        page,
        pageSize,
        offset,
        total: 0,
        totalPages: 0,
        hasNextPages: false,
        hasPreviousPages: page > 1
    };
    next();
};
export default paginate;