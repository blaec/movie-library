[Backup instructions](https://www.sqlshack.com/how-to-backup-and-restore-mysql-databases-using-the-mysqldump-command/)
[Password free backup](https://stackoverflow.com/questions/19248567/mysql-5-6-how-to-create-a-backup-on-windows-using-mysqldump-without-a-password)

```
mysqldump --user=user --password=password db_name > C:\MySQLBackup\backup_file_name.sql
Enter password: ****
```

[Automatic backup](https://blog.devart.com/how-to-setup-daily-mysql-backup-on-windows.html)

Add timestampt to the file name:
`%date:~6,2%%date:~3,2%%date:~0,2%_%time:~0,2%-%time:~3,2%-%time:~6,2%`

If base date is: dd/mm/yy, then the code above will parse it to yymmdd
Check the current base date format - type in cmd: `echo %date%`
Same rules applied to the `%time%`.

[Delete old files](https://winaero.com/delete-files-older-x-days/) (older than 30 days):
```aidl
ForFiles /p "C:\Users\blaec\Google Drive\mySql backup\backup" /s /d -30 /c "cmd /c del @file"
```

---

[Clone db](https://stackoverflow.com/questions/675289/mysql-cloning-a-mysql-database-on-the-same-mysql-instance)

Create dummy_movie_library schema
```aidl
mysqldump --user=user --password=password movie_library | mysql --user=user --password=password dummy_movie_library
```