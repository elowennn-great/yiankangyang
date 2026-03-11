// 颐安康养服务中心 - 简单交互脚本

document.addEventListener("DOMContentLoaded", function () {
  // 移动端导航展开
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // 返回顶部按钮
  const backTop = document.querySelector(".back-to-top");
  if (backTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 260) {
        backTop.classList.add("visible");
      } else {
        backTop.classList.remove("visible");
      }
    });

    backTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 预约表单：提交到本地后台接口
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("contactName")?.value.trim() || "";
      const phone = document.getElementById("contactPhone")?.value.trim() || "";
      const service = document.getElementById("serviceType")?.value.trim() || "";
      const elder = document.getElementById("elderInfo")?.value.trim() || "";

      if (!name || !phone || !service) {
        alert("请先填写姓名、电话和意向服务。");
        return;
      }

      fetch("http://localhost:3000/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          phone,
          service,
          elderInfo: elder
        })
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("网络错误");
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            alert("提交成功，我们会尽快与您电话联系确认预约。");
            contactForm.reset();
          } else {
            alert("提交失败，请稍后重试或直接拨打电话：400-xxx-xxxx");
          }
        })
        .catch(() => {
          alert("提交失败，请稍后重试或直接拨打电话：400-xxx-xxxx");
        });
    });
  }
});

