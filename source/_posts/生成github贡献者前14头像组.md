---
title: 生成github贡献者前14头像组
date: 2024-04-06 19:17:15
tags: python
---

> 摆脱心事的最好方法是工作。——车尔尼雪夫斯基

这里当然完全用`python`也能行，我这里快速弄出来

先在`chrome`里打开检查，然后选中

![](/imgs/oss/blog-img/2024-04-06-19-20-23-image.png)

`chrome`控制台`console`里执行

```javascript
Array.from($0.querySelectorAll(".avatar")).map(({src})=>src)
```

得到

```javascript
[
    "https://avatars.githubusercontent.com/u/28334419?s=64&v=4",
    "https://avatars.githubusercontent.com/u/1481125?s=64&v=4",
    "https://avatars.githubusercontent.com/u/15142701?s=64&v=4",
    "https://avatars.githubusercontent.com/u/20453060?s=64&v=4",
    "https://avatars.githubusercontent.com/in/2141?s=64&v=4",
    "https://avatars.githubusercontent.com/u/12861772?s=64&v=4",
    "https://avatars.githubusercontent.com/in/29110?s=64&v=4",
    "https://avatars.githubusercontent.com/u/16700837?s=64&v=4",
    "https://avatars.githubusercontent.com/u/39977647?s=64&v=4",
    "https://avatars.githubusercontent.com/u/52746628?s=64&v=4",
    "https://avatars.githubusercontent.com/u/5666807?s=64&v=4",
    "https://avatars.githubusercontent.com/u/9296576?s=64&v=4",
    "https://avatars.githubusercontent.com/u/41781780?s=64&v=4",
    "https://avatars.githubusercontent.com/u/3936684?s=64&v=4"
]
```

然后新建个`java`临时文件下载

```java
import java.io.BufferedInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;

class Scratch {
    public static void main(String[] args) {
        String[] imageUrls = {
                "https://avatars.githubusercontent.com/u/28334419?s=64&v=4",
                "https://avatars.githubusercontent.com/u/1481125?s=64&v=4",
                "https://avatars.githubusercontent.com/u/15142701?s=64&v=4",
                "https://avatars.githubusercontent.com/u/20453060?s=64&v=4",
                "https://avatars.githubusercontent.com/in/2141?s=64&v=4",
                "https://avatars.githubusercontent.com/u/12861772?s=64&v=4",
                "https://avatars.githubusercontent.com/in/29110?s=64&v=4",
                "https://avatars.githubusercontent.com/u/16700837?s=64&v=4",
                "https://avatars.githubusercontent.com/u/39977647?s=64&v=4",
                "https://avatars.githubusercontent.com/u/52746628?s=64&v=4",
                "https://avatars.githubusercontent.com/u/5666807?s=64&v=4",
                "https://avatars.githubusercontent.com/u/9296576?s=64&v=4",
                "https://avatars.githubusercontent.com/u/41781780?s=64&v=4",
                "https://avatars.githubusercontent.com/u/3936684?s=64&v=4"
        };
        for (int i = 0; i < imageUrls.length; i++) {
            String savePath = "image_" + (i + 1) + ".jpg"; // Or use another method to determine filenames
            try {
                downloadImage(imageUrls[i], savePath);
                System.out.println("Downloaded: " + savePath);
            } catch (IOException e) {
                System.err.println("Error downloading " + imageUrls[i] + ": " + e.getMessage());
            }
        }
    }

    public static void downloadImage(String imageUrl, String savePath) throws IOException {
        URL url = new URL(imageUrl);
        try (BufferedInputStream in = new BufferedInputStream(url.openStream());
             FileOutputStream fileOutputStream = new FileOutputStream(savePath)) {
            byte dataBuffer[] = new byte[1024];
            int bytesRead;
            while ((bytesRead = in.read(dataBuffer, 0, 1024)) != -1) {
                fileOutputStream.write(dataBuffer, 0, bytesRead);
            }
        } catch (IOException e) {
            // Handle exception
            throw e;
        }
    }
}

```

然后是用`python`将图片转成圆角，然后合成图片

```bash
GithubIireAchao:Downloads achao$ touch create_collage.py
```

创建文件

```python
from PIL import Image, ImageDraw
import os

def create_rounded_image(image_path, output_path, corner_radius=50, final_size=(64, 64)):
    """Create a rounded corner image, resize it to 64x64, and save it."""
    try:
        img = Image.open(image_path)
        # Resize with antialiasing (using LANCZOS resampling)
        img = img.resize(final_size, Image.Resampling.LANCZOS).convert("RGBA")
        
        # Create rounded mask
        mask = Image.new('L', img.size, 0)
        draw = ImageDraw.Draw(mask)
        draw.rounded_rectangle([(0, 0), img.size], corner_radius, fill=255)
        
        # Apply rounded mask to image
        img.putalpha(mask)
        
        # Save with rounded corners
        img.save(output_path)
        print(f"Processed and saved: {os.path.basename(output_path)}")
    except Exception as e:
        print(f"Error processing {os.path.basename(image_path)}: {e}")

def create_collage(image_paths, output_path, images_per_row=7, spacing=10):
    """Create a collage of images with transparent background."""
    try:
        images = [Image.open(path).convert("RGBA") for path in image_paths]
        image_width, image_height = images[0].size
        total_width = image_width * images_per_row + spacing * (images_per_row - 1)
        total_rows = (len(images) + images_per_row - 1) // images_per_row
        total_height = image_height * total_rows + spacing * (total_rows - 1)
        
        # Collage with transparent background
        collage = Image.new('RGBA', (total_width, total_height), (0, 0, 0, 0))
        
        for index, image in enumerate(images):
            row_num = index // images_per_row
            col_num = index % images_per_row
            x = col_num * (image_width + spacing)
            y = row_num * (image_height + spacing)
            collage.paste(image, (x, y), image)
        
        collage.save(output_path)
        print("Collage created successfully.")
    except Exception as e:
        print(f"Error creating collage: {e}")

# Paths and settings
image_folder = "/Users/achao/Downloads"
output_folder = image_folder
rounded_images = []

for i in range(1, 15):
    input_path = os.path.join(image_folder, f"image_{i}.jpg")
    output_path = os.path.join(output_folder, f"rounded_{i}.png")
    create_rounded_image(input_path, output_path, corner_radius=50, final_size=(64, 64))
    rounded_images.append(output_path)

collage_output_path = os.path.join(output_folder, "collage.png")
create_collage(rounded_images, collage_output_path)


```

这里需要下载`PIL`库

```bash
GithubIireAchao:Downloads achao$ python3 create_collage.py
Traceback (most recent call last):
  File "/Users/achao/Downloads/create_collage.py", line 1, in <module>
    from PIL import Image, ImageOps
ModuleNotFoundError: No module named 'PIL'
GithubIireAchao:Downloads achao$ pip3 install Pillow

Looking in indexes: https://pypi.org/simple, https://packagecloud.io/github/git-lfs/pypi/simple
Collecting Pillow
  Downloading pillow-10.3.0-cp310-cp310-macosx_11_0_arm64.whl.metadata (9.2 kB)
Downloading pillow-10.3.0-cp310-cp310-macosx_11_0_arm64.whl (3.4 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 3.4/3.4 MB 60.2 kB/s eta 0:00:00
Installing collected packages: Pillow
Successfully installed Pillow-10.3.0
```

最后：

```bash
GithubIireAchao:Downloads achao$ python3 create_collage.py
Processed and saved: rounded_1.png
Processed and saved: rounded_2.png
Processed and saved: rounded_3.png
Processed and saved: rounded_4.png
Processed and saved: rounded_5.png
Processed and saved: rounded_6.png
Processed and saved: rounded_7.png
Processed and saved: rounded_8.png
Processed and saved: rounded_9.png
Processed and saved: rounded_10.png
Processed and saved: rounded_11.png
Processed and saved: rounded_12.png
Processed and saved: rounded_13.png
Processed and saved: rounded_14.png
Collage created successfully.
GithubIireAchao:Downloads achao$ 
```

成图：

![](/imgs/oss/blog-img/2024-04-06-19-55-12-image.png)
