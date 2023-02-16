<?php
session_start();
//error_reporting(0);
include('includes/config.php');
if (strlen($_SESSION['aid']==0)) {
  header('location:logout.php');
  } else{
//code for Cart
if(!empty($_GET["action"])) {
switch($_GET["action"]) {

//code for adding product in cart
    case "add":
        if(!empty($_POST["quantity"])) {
            $pid=$_GET["pid"];
            $result=mysqli_query($con,"SELECT * FROM tblproducts WHERE id='$pid'");
              while($productByCode=mysqli_fetch_array($result)){
            $itemArray = array($productByCode["id"]=>array('catname'=>$productByCode["CategoryName"], 'compname'=>$productByCode["CompanyName"], 'quantity'=>$_POST["quantity"], 'pname'=>$productByCode["ProductName"], 'price'=>$productByCode["ProductPrice"],'code'=>$productByCode["id"]));
            if(!empty($_SESSION["cart_item"])) {
                if(in_array($productByCode["id"],array_keys($_SESSION["cart_item"]))) {
                    foreach($_SESSION["cart_item"] as $k => $v) {
                            if($productByCode["id"] == $k) {
                                if(empty($_SESSION["cart_item"][$k]["quantity"])) {
                                    $_SESSION["cart_item"][$k]["quantity"] = 0;
                                }
                                $_SESSION["cart_item"][$k]["quantity"] += $_POST["quantity"];
                            }
                    }
                } else {
                    $_SESSION["cart_item"] = array_merge($_SESSION["cart_item"],$itemArray);
                }
            }  else {
                $_SESSION["cart_item"] = $itemArray;
            }
        }
    }
    break;

    // code for removing product from cart
    case "remove":
        if(!empty($_SESSION["cart_item"])) {
            foreach($_SESSION["cart_item"] as $k => $v) {
                    if($_GET["code"] == $k)
                        unset($_SESSION["cart_item"][$k]);              
                    if(empty($_SESSION["cart_item"]))
                        unset($_SESSION["cart_item"]);
            }
        }
    break;
    // code for if cart is empty
    case "empty":
        unset($_SESSION["cart_item"]);
    break;  
}
}

//Code for Checkout
if(isset($_POST['checkout'])){
$invoiceno= mt_rand(100000000, 999999999);
$pid=$_SESSION['productid'];
$quantity=$_POST['quantity'];
$cname=$_POST['customername'];
$cmobileno=$_POST['mobileno'];
$pmode=$_POST['paymentmode'];
$value=array_combine($pid,$quantity);
foreach($value as $pdid=> $qty){
$query=mysqli_query($con,"insert into tblorders(ProductId,Quantity,InvoiceNumber,CustomerName,CustomerContactNo,PaymentMode) values('$pdid','$qty','$invoiceno','$cname','$cmobileno','$pmode')") ; 
}
echo '<script>alert("Invoice genrated successfully. Invoice number is "+"'.$invoiceno.'")</script>';  
 unset($_SESSION["cart_item"]);
 $_SESSION['invoice']=$invoiceno;
 echo "<script>window.location.href='invoice.php'</script>";

}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Search Product</title>
    <link href="vendors/jquery-toggles/css/toggles.css" rel="stylesheet" type="text/css">
    <link href="vendors/jquery-toggles/css/themes/toggles-light.css" rel="stylesheet" type="text/css">
    <link href="dist/css/style.css" rel="stylesheet" type="text/css">
</head>

<body>
    
    
	<!-- HK Wrapper -->
	<div class="hk-wrapper hk-vertical-nav">

<!-- Top Navbar -->
<?php include_once('includes/navbar.php');
include_once('includes/sidebar.php');
?>
       


        <div id="hk_nav_backdrop" class="hk-nav-backdrop"></div>
        <!-- /Vertical Nav -->



        <!-- Main Content -->
        <div class="hk-pg-wrapper">
            <!-- Breadcrumb -->
            <nav class="hk-breadcrumb" aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-light bg-transparent">
<li class="breadcrumb-item"><a href="#">Search</a></li>
<li class="breadcrumb-item active" aria-current="page">Product</li>
                </ol>
            </nav>
            <!-- /Breadcrumb -->

            <!-- Container -->
            <div class="container">
                <!-- Title -->
                <div class="hk-pg-header">
                    <h4 class="hk-pg-title"><span class="pg-title-icon"><span class="feather-icon"><i data-feather="external-link"></i></span></span>Search Product</h4>
                </div>
                <!-- /Title -->

                <!-- Row -->
                <div class="row">
                    <div class="col-xl-12">

<section class="hk-sec-wrapper">

<div class="row">
<div class="col-sm">
<form class="needs-validation" method="post" novalidate>
                                       
<div class="form-row">
<div class="col-md-6 mb-10">
<label for="validationCustom03">Product Name</label>
<input type="text" class="form-control" id="validationCustom03" placeholder="Product Name" name="productname" required>
<div class="invalid-feedback">Please provide a valid product name.</div>
</div>
</div>

                                 
<button class="btn btn-primary" type="submit" name="search">search</button>
</form>
</div>
</div>
</section>
<!--code for search result -->
<?php if(isset($_POST['search'])){?>
 <section class="hk-sec-wrapper">
     
                            <div class="row">
                                <div class="col-sm">
                                    <div class="table-wrap">
                                        <table id="datable_1" class="table table-hover w-100 display pb-30">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Category</th>
                                                    <th>Company</th>
                                                    <th>Product</th>
                                                    <th>Pricing</th>
                                                    <th>Quantity</th>
                                                    <th>Action</th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
<?php
$pname=$_POST['productname'];
$query=mysqli_query($con,"select * from tblproducts where ProductName like '%$pname%'");
$cnt=1;
while($row=mysqli_fetch_array($query))
{    
?>
<form method="post" action="search-product.php?action=add&pid=<?php echo $row["id"]; ?>">                                                  
<tr>
<td><?php echo $cnt;?></td>
<td><?php echo $row['CategoryName'];?></td>
<td><?php echo $row['CompanyName'];?></td>
<td><?php echo $row['ProductName'];?></td>
<td><?php echo $row['ProductPrice'];?></td>
<td><input type="text" class="product-quantity" name="quantity" value="1" size="2" /></td>
<td>
<input type="submit" value="Add to Cart" class="btnAddAction" />
</td>
</tr>
</form>
<?php 
$cnt++;
} ?>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
</section>
<?php } ?>                        


<form class="needs-validation" method="post" novalidate>

<!--- Shopping Cart ---->
<section class="hk-sec-wrapper">
     
                            <div class="row">
                                <div class="col-sm">
                                    <div class="table-wrap">
<h4>Shopping Cart</h4>
<hr />

<a id="btnEmpty" href="search-product.php?action=empty" >Empty Cart</a>
<?php
if(isset($_SESSION["cart_item"])){
    $total_quantity = 0;
    $total_price = 0;
?>  
  <table id="datable_1" class="table table-hover w-100 display pb-30" border="1">
<tbody>
<tr>
<th >Product Name</th>
<th>Category</th>
<th>Company</th>
<th width="5%">Quantity</th>
<th width="10%">Unit Price</th>
<th width="10%">Price</th>
<th width="5%">Remove</th>
</tr>   
<?php 
 $productid=array();      
    foreach ($_SESSION["cart_item"] as $item){
        $item_price = $item["quantity"]*$item["price"];
        array_push($productid,$item['code']);

        ?>
           <input type="hidden" value="<?php echo $item['quantity']; ?>" name="quantity[<?php echo $item['code']; ?>]">
                <tr>
                <td><?php echo $item["pname"]; ?></td>
                <td><?php echo $item["catname"]; ?></td>
                <td><?php echo $item["compname"]; ?></td>
                <td><?php echo $item["quantity"]; ?></td>
                <td><?php echo $item["price"]; ?></td>
                <td><?php echo number_format($item_price,2); ?></td>
                <td><a href="search-product.php?action=remove&code=<?php echo $item["code"]; ?>" class="btnRemoveAction"><img src="dist/img/icon-delete.png" alt="Remove Item" /></a></td>
                </tr>
                <?php
                $total_quantity += $item["quantity"];
                $total_price += ($item["price"]*$item["quantity"]);
        }
        $_SESSION['productid']=$productid;
        ?>

<tr>
<td colspan="3" align="right">Total:</td>
<td colspan="2"><?php echo $total_quantity; ?></td>
<td colspan=><strong><?php echo number_format($total_price, 2); ?></strong></td>
<td></td>
</tr>
</tbody>
</table>  

<div class="form-row">
<div class="col-md-6 mb-10">
<label for="validationCustom03">Customer Name</label>
<input type="text" class="form-control" id="validationCustom03" placeholder="Customer Name" name="customername" required>
<div class="invalid-feedback">Please provide a valid customer name.</div>
</div>
<div class="col-md-6 mb-10">
<label for="validationCustom03">Customer Mobile Number</label>
<input type="text" class="form-control" id="validationCustom03" placeholder="Mobile Number" name="mobileno" required>
<div class="invalid-feedback">Please provide a valid mobile number.</div>
</div>
</div>

<div class="form-row">
<div class="col-md-6 mb-10">
    <label for="validationCustom03">Payment Mode</label>
<div class="custom-control custom-radio mb-10">
<input type="radio" class="custom-control-input" id="customControlValidation2" name="paymentmode" value="cash" required>
<label class="custom-control-label" for="customControlValidation2">Cash</label>
</div>
<div class="custom-control custom-radio mb-10">
<input type="radio" class="custom-control-input" id="customControlValidation3" name="paymentmode" value="card" required>
<label class="custom-control-label" for="customControlValidation3">Card</label>
</div>
</div>
<div class="col-md-6 mb-10">
<button class="btn btn-primary" type="submit" name="checkout">Checkout</button>
</div>
</div>
</form>

  <?php
} else {
?>
<div style="color:red" align="center">Your Cart is Empty</div>
<?php 
}
?>
</div>
</div></div></section>



    




</div>
</div>
</div>


            <!-- Footer -->
<?php include_once('includes/footer.php');?>
            <!-- /Footer -->

        </div>
        <!-- /Main Content -->

    </div>

    <script src="vendors/jquery/dist/jquery.min.js"></script>
    <script src="vendors/popper.js/dist/umd/popper.min.js"></script>
    <script src="vendors/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="vendors/jasny-bootstrap/dist/js/jasny-bootstrap.min.js"></script>
    <script src="dist/js/jquery.slimscroll.js"></script>
    <script src="dist/js/dropdown-bootstrap-extended.js"></script>
    <script src="dist/js/feather.min.js"></script>
    <script src="vendors/jquery-toggles/toggles.min.js"></script>
    <script src="dist/js/toggle-data.js"></script>
    <script src="dist/js/init.js"></script>
    <script src="dist/js/validation-data.js"></script>
    <style type="text/css">
        #btnEmpty {
    background-color: #ffffff;
    border: #d00000 1px solid;
    padding: 5px 10px;
    color: #d00000;
    float: right;
    text-decoration: none;
    border-radius: 3px;
    margin: 10px 0px;
}

    </style>

</body>
</html>
<?php } ?>