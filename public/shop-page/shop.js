document.querySelectorAll('.add-to-cart-form').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    try {
      const response = await fetch('/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: formData.get('productId'),
          name: formData.get('name'),
          price: formData.get('price'),
          image: formData.get('image')
        })
      });

      const result = await response.json();
      if (result.success) {
        window.location.href = '/basket';
      } else {
        alert('Successfully added to cart!');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  });
});