import React from 'react';


const AddProduct = () => {

    return (


        <>



            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <form>
                            <div class="mb-3">
                                <label for="productName" class="form-label">Product Name:</label>
                                <input type="text" id="productName" name="productName" value="pro 1 test" class="form-control" />
                            </div>

                            <div class="mb-3">
                                <label for="productDescription" class="form-label">Product Description:</label>
                                <textarea id="productDescription" name="productDescription" class="form-control">test pro</textarea>
                            </div>

                            <div class="mb-3">
                                <label for="productPrice" class="form-label">Price:</label>
                                <input type="text" id="productPrice" name="productPrice" value="50.00" class="form-control" />
                            </div>

                            <div class="mb-3">
                                <label for="productBrand" class="form-label">Brand:</label>
                                <input type="text" id="productBrand" name="productBrand" value="HW" class="form-control" />
                            </div>

                            <div class="mb-3">
                                <label for="productStock" class="form-label">Stock:</label>
                                <input type="number" id="productStock" name="productStock" value="5" class="form-control" />
                            </div>

                            <div class="mb-3">
                                <label for="productRatings" class="form-label">Ratings:</label>
                                <input type="text" id="productRatings" name="productRatings" value="0.02" class="form-control" />
                            </div>

                            <div class="mb-3 form-check">
                                <input type="checkbox" id="productNew" name="productNew" checked class="form-check-input" />
                                <label for="productNew" class="form-check-label">New</label>
                            </div>

                            <div class="mb-3 form-check">
                                <input type="checkbox" id="productSale" name="productSale" checked class="form-check-input" />
                                <label for="productSale" class="form-check-label">Sale</label>
                            </div>

                            <div class="mb-3">
                                <label for="productNewPrice" class="form-label">New Price:</label>
                                <input type="text" id="productNewPrice" name="productNewPrice" value="5.00" class="form-control" />
                            </div>

                            <div class="mb-3">
                                <label for="productThumbnail" class="form-label">Thumbnail:</label>
                                <input type="text" id="productThumbnail" name="productThumbnail" value="/media/static/images/notfound.png" class="form-control" />
                            </div>

                            <div class="mb-3">
                                <label for="productCategory" class="form-label">Category:</label>
                                <input type="number" id="productCategory" name="productCategory" value="1" class="form-control" />
                            </div>

                            <div class="mb-3">
                                <label for="productStock_S" class="form-label">Stock (S):</label>
                                <input type="number" id="productStock_S" name="productStock_S" value="5" class="form-control" />
                            </div>

                            <div class="mb-3">
                                <label for="productStock_M" class="form-label">Stock (M):</label>
                                <input type="number" id="productStock_M" name="productStock_M" value="48" class="form-control" />
                            </div>

                            <div class="mb-3">
                                <label for="productStock_L" class="form-label">Stock (L):</label>
                                <input type="number" id="productStock_L" name="productStock_L" value="288" class="form-control" />
                            </div>

                            <div class="mb-3">
                                <label for="productStock_XL" class="form-label">Stock (XL):</label>
                                <input type="number" id="productStock_XL" name="productStock_XL" value="80" class="form-control" />
                            </div>

                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )

}


export default AddProduct;