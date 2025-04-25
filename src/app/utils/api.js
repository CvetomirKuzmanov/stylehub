
export const apiResponse = {
    success: (data, status = 200) => {
      return Response.json(data, { status });
    },
    
    error: (message, status = 400) => {
      return Response.json({ error: message }, { status });
    },
    
    serverError: (error) => {
      console.error('Server error:', error);
      return Response.json(
        { error: 'Internal server error' }, 
        { status: 500 }
      );
    }
  };
  
  export const formatErrorResponse = (errorResult) => {
    return Response.json(
      { error: errorResult.error },
      { status: errorResult.statusCode }
    );
  };