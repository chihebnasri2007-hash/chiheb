import sys
try:
    from PIL import Image, ImageOps
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image, ImageOps

try:
    img_path = r"E:\my-website\WhatsApp Image 2026-04-09 at 5.14.26 PM.jpeg"
    img = Image.open(img_path).convert('RGB')
    
    # Convert to grayscale to find the logo
    gray = img.convert("L")
    w, h = gray.size
    
    # Find bounding box of non-black pixels (threshold > 15)
    gray_data = gray.load()
    min_x, min_y = w, h
    max_x = max_y = 0
    for y in range(h):
        for x in range(w):
            if gray_data[x,y] > 15:
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y
                
    if max_x >= min_x and max_y >= min_y:
        logo = img.crop((min_x, min_y, max_x, max_y))
    else:
        logo = img
        
    logo_w, logo_h = logo.size
    
    # We want to make the logo look smaller and perfectly centered in a black square.
    # A favicon is square. Let's make the canvas size 1.5x the max dimension.
    canvas_size = int(max(logo_w, logo_h) * 1.5)
    canvas = Image.new('RGB', (canvas_size, canvas_size), (0, 0, 0))
    
    # Paste centered
    offset = ((canvas_size - logo_w) // 2, (canvas_size - logo_h) // 2)
    canvas.paste(logo, offset)
    
    # Save as high-res PNG for the favicon
    out_path = r"E:\my-website\favicon.png"
    canvas.save(out_path)
    print("Success: saved to", out_path)
    
except Exception as e:
    print("Error:", e)
