# passport

Passport is strategy de chung thuc 1 nguoi dung thong qua cookies session cua nodejs

## 5 chức năng chính khi sử dụng PassportJS

- passport.initialize() =>  Khoi tao passport
- passport.session() => Khoi tao passport lam viec voi session thong qua package express-session

- passport.authentication() => xac thuc thong qua 1  middleware => xac thuc username, password
- passport.serializeUser() => dam bao 1 danh tinh khi xac thuc thanh cong => cap 1 danh tinh dua vao cookies or session nam tren browser
- passport.deserializeUser()  => khi chung ta goi 1 req thi cookies => truyen vao func nay xac thuc them 1 lan nua